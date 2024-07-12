import { Suspense } from "react";
import "./App.css";
import { CheckAIAvailability } from "./CheckAIAvailability";
import { Quiz } from "./Quiz";
import { quizData } from "./quiz-data";

function App() {
  return (
    <>
      <h1>ECMAScriptクイズ</h1>
      <h2>これは何？</h2>
      <p>
        これは、ECMAScript (JavaScript) に関する<strong>記述式のクイズ</strong>
        に答えると、AI (LLM) が採点してくれるアプリです。
      </p>
      <p>
        Google Chromeが独自に実装した
        <a
          href="https://developer.chrome.com/docs/ai/built-in?hl=ja"
          target="_blank"
        >
          ブラウザ組み込みのAI
        </a>
        を利用しています。
      </p>
      <p>
        採点を動作させるためには、Google
        ChromeのCanary版を利用して、組み込みAIを有効にする必要があります。具体的な手順は以下のページを参考にしてください。
      </p>
      <p>
        <a
          href="https://azukiazusa.dev/blog/try-chrome-internal-ai-gemini-nano/"
          target="_blank"
        >
          Chrome の 組み込み AI Gemini Nano を試してみる
        </a>
      </p>
      <Suspense
        fallback={
          <section className="ai-check in-progress">
            <h2>AI動作環境チェック中</h2>
            <p>組み込みAIが動作する環境かどうかチェックしています</p>
          </section>
        }
      >
        <section className="ai-check">
          <h2>AI動作環境チェック結果</h2>
          <CheckAIAvailability />
        </section>
      </Suspense>
      <Quiz quiz={quizData[0]} />
    </>
  );
}

export default App;
