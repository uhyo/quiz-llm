import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error process
  base: process.env.GITHUB_ACTIONS === "true" ? "/quiz-llm/" : "/",
  plugins: [react()],
});
