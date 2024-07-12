/// <reference types="react/canary" />

/* eslint-disable no-var */
declare global {
  interface AI {
    canCreateTextSession(): Promise<"readily" | "after-download" | "no">;
    createTextSession(): Promise<AITextSession>;
  }

  interface AITextSession {
    prompt(text: string): Promise<string>;
  }

  var ai: AI;
}
