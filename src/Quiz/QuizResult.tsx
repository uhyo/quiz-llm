import React from "react";
import { EvaluateProgress } from "./evaluate";

export const QuizResult: React.FC<{
  progress: EvaluateProgress;
}> = ({ progress }) => {
  return (
    <div className="evaluation">
      {progress.criteria.map((criterion) => (
        <section key={criterion.no} className={`criterion ${criterion.status}`}>
          <h3>採点基準 {criterion.no}</h3>
          <p className="status">
            {criterion.status === "pending"
              ? "採点中"
              : criterion.status === "done"
                ? "採点完了"
                : criterion.status === "correct"
                  ? "達成"
                  : criterion.status === "incorrect"
                    ? "未達成"
                    : "不明"}
          </p>
          <p className="criterion-text">{criterion.text}</p>
        </section>
      ))}
      <section
        className={`criterion ${progress.finished ? "done" : "pending"}`}
      >
        <h3>総評</h3>
        <p>{progress.finished ? "生成完了" : "生成中"}</p>
      </section>
      {progress.finished && (
        <>
          <section className="review">
            <h3>総評</h3>
            <p className="ai-output">{progress.reviewText}</p>
          </section>
          <section className="score">
            <h3>得点</h3>
            <p>
              <b>{progress.score}</b> / {progress.maxScore}
            </p>
          </section>
        </>
      )}
    </div>
  );
};
