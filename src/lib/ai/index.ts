import { claude } from "./claude";
import { mockAnalyze } from "./mock";
import { AnalyzeInput } from "./types";

export const analyzeBookmark = async (input: AnalyzeInput) => {
  return process.env.ANTHROPIC_API_KEY &&
    process.env.NODE_ENV === "production"
    ? claude(input)
    : mockAnalyze(input);
};
