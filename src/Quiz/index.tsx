import React, { useCallback, useTransition } from "react";
import { QuizData } from "../quiz-data";
import { evaluateAnswer, EvaluateProgress } from "./evaluate";
import { QuizResult } from "./QuizResult";

export const Quiz: React.FC<{
  quiz: QuizData;
}> = ({ quiz }) => {
  const [progress, setProgress] = React.useState<EvaluateProgress | undefined>(
    undefined,
  );
  const [isPending, startTransition] = useTransition();
  const startEvaluation = (formData: FormData) => {
    startTransition(async () => {
      try {
        for await (const progress of evaluateAnswer(
          quiz,
          formData.get("answer") as string,
        )) {
          setProgress(progress);
        }
      } catch (error) {
        console.error(error);
        alert("エラー: " + error);
      }
    });
  };

  const initialTextAreaValue =
    localStorage.answerText ||
    `
Temporalは、イミュータブルなオブジェクトとして提供されている点がDateより優れている。
また、日時を表すPlainDateTimeオブジェクトのほかに、日付だけのPlainDateオブジェクトや時刻だけのPlainTimeオブジェクトなど、目的に応じたオブジェクトが利用できる。
`.trim();
  const textareaRef = useCallback((node: HTMLTextAreaElement) => {
    const timer = setInterval(() => {
      localStorage.answerText = node.value;
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h2>問題</h2>
      <p>{quiz.question}</p>
      <h2>回答入力</h2>
      <form action={startEvaluation}>
        <p>
          <textarea
            name="answer"
            rows={5}
            ref={textareaRef}
            defaultValue={initialTextAreaValue}
          ></textarea>
        </p>
        <p>
          <button type="submit" disabled={isPending}>
            {isPending ? "採点中……" : "採点する"}
          </button>
        </p>
      </form>
      {progress !== undefined && <QuizResult progress={progress} />}
    </>
  );
};
