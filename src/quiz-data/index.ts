export type QuizData = {
  question: string;
  criteria: {
    text: string;
    point: number;
  }[];
};

export const quizData: QuizData[] = [
  {
    question: `現在仕様策定中のTemporalは、既存のDateオブジェクトと比べてどのような利点がありますか。可能な限り挙げてください。`,
    criteria: [
      {
        // text: "既存のDateがミュータブルなオブジェクトであるのに対し、Temporalはイミュータブルなオブジェクトであることを説明しているか？",
        text: "既存のDateがミュータブルなオブジェクトであるのに対し、Temporalはイミュータブルなオブジェクトを提供している",
        point: 8,
      },
      {
        // text: "Dateではタイムゾーンの扱いが難しかったのに対して、Temporalではタイムゾーンの扱いが簡単になることを説明しているか？",
        text: "Dateではタイムゾーンの扱いが難しかったのに対して、Temporalではタイムゾーンの扱いが簡単になる",
        point: 5,
      },
      {
        // text: "Temporalでは日付だけを表すオブジェクトや時刻だけを表すオブジェクトなど、目的に応じたオブジェクトが利用できることを説明しているか？",
        text: "Temporalでは日付だけを表すオブジェクトや時刻だけを表すオブジェクトなど、目的に応じたオブジェクトが利用できる",
        point: 3,
      },
      {
        // text: "Dateでは日時のパースの仕様が曖昧だったのに対して、Temporalでは日時のパースの仕様が厳密に定義されていることを説明しているか？",
        text: "Dateでは日時のパースの仕様が曖昧だったのに対して、Temporalでは日時のパースの仕様が厳密に定義されている",
        point: 2,
      },
      {
        // text: "Temporalがグレゴリオ歴以外のカレンダーシステムにも対応していることを説明しているか？",
        text: "Temporalはグレゴリオ歴以外のカレンダーシステムにも対応している",
        point: 2,
      },
    ],
  },
];
