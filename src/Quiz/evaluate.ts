import { QuizData } from "../quiz-data";

export type EvaluateProgress = {
  finished: boolean;
  criteria: {
    no: number;
    text: string | undefined;
    status: "pending" | "done" | "correct" | "incorrect";
  }[];
  reviewText: string;
  score: number;
  maxScore: number;
};

export async function* evaluateAnswer(
  quiz: QuizData,
  answer: string,
): AsyncGenerator<EvaluateProgress, void, void> {
  const result: EvaluateProgress = {
    finished: false,
    criteria: quiz.criteria.map((_, index) => ({
      no: index + 1,
      text: undefined,
      status: "pending",
    })),
    reviewText: "",
    score: 0,
    maxScore: quiz.criteria.reduce(
      (sum, criterion) => sum + criterion.point,
      0,
    ),
  };
  yield structuredClone(result);

  const correctness: boolean[] = [];
  let totalScore = 0;

  const session = await window.ai.createTextSession();
  let retryCount = 0;
  const maxRetryCount = 5;
  for (let index = 0; index < quiz.criteria.length; index++) {
    const criterion = quiz.criteria[index];
    //     const input = `クイズの採点をしてください。
    // 【問題文】
    // ${quiz.question}

    // 【回答】
    // ${answer}

    // 【採点基準】
    // ${criteria.text}

    // 【採点方法】
    // この回答が採点基準を満たしているかどうか判定してください。
    // 回答が採点基準の内容に言及していない場合は「いいえ」と答えてください。
    // 回答が採点基準の内容を含んでいる場合は「はい」と答えてください。
    // 回答が採点基準以外のことに言及していたとしても、採点基準を満たしている場合は「はい」と答えてください。
    // 必ず「はい」か「いいえ」だけで答えてください。「はい」か「いいえ」以外の回答は無効となります。
    //   `;
    const input = `以下の前提知識を読んで、主張の正誤判定を行ってください。

【前提知識】
${answer}

【主張】
${criterion.text}

【注意点】
前提知識の内容だけを見て判断してください。
主張が前提知識と一致する場合には「はい」と答えてください。
主張が前提知識と異なることを言っている場合には「いいえ」と答えてください。
以下の形式で判定結果を教えてください。

- **理由**: 判定結果の理由を簡潔に説明する
- **結論**: 「はい」または「いいえ」を入力

結論には「はい」または「いいえ」のいずれかを入力してください。
  `;
    const output = await prompt(input);

    const isCorrect = output.includes("はい");
    const isIncorrect = output.includes("いいえ");
    if ((!isCorrect && !isIncorrect) || (isCorrect && isIncorrect)) {
      if (retryCount < maxRetryCount) {
        console.log("retry");
        retryCount++;
        index--;
        continue;
      }
      throw new Error("採点できませんでした");
    }
    result.criteria[index].status = "done";
    correctness[index] = isCorrect;
    totalScore += isCorrect ? criterion.point : 0;
    yield structuredClone(result);
  }
  for (const [index, isCorrect] of correctness.entries()) {
    result.criteria[index].status = isCorrect ? "correct" : "incorrect";
    result.criteria[index].text = quiz.criteria[index].text;
  }

  yield structuredClone(result);

  const input = `クイズの回答を総合的に評価をしてください。
採点基準も踏まえながら、回答全体の良し悪しを簡潔に述べてください。
ただし、点数には言及しないでください。

【問題文】
${quiz.question}

【採点基準】
${quiz.criteria
  .map((criterion, index) => `${index + 1}. ${criterion.text}`)
  .join("\n")}

【回答】
${answer}

`;
  const output = await prompt(input);
  result.reviewText = output;
  result.score = totalScore;
  result.finished = true;
  yield structuredClone(result);

  async function prompt(input: string): Promise<string> {
    console.log("input", input);
    const output = await session.prompt(input);
    console.log("output", output);
    return output;
  }
}
