import { claude } from "./claude";
import { AnalyzeInput } from "./types";

export const analyzeBookmark = async (input: AnalyzeInput) => {
  return await claude(input);
};
