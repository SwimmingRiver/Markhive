import Anthropic from "@anthropic-ai/sdk";
import { AnalyzeInput, AnalyzeOutput } from "./types";

const client = new Anthropic({
  baseURL: process.env.ANTHROPIC_BASE_URL,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const claude = async (input: AnalyzeInput): Promise<AnalyzeOutput> => {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: `You are a bookmark analysis assistant. Always respond with valid JSON only. No explanations, no markdown, no extra text.`,
    messages: [
      {
        role: "user",
        content: `Analyze this webpage and respond with JSON only.
URL: ${input.url}
Title: ${input.title ?? "none"}
Description: ${input.description ?? "none"}

Rules for tags:
- Use broad category tags only (e.g. "개발", "디자인", "비즈니스", "스포츠", "뉴스", "영상", "교육", "음악", "게임", "건강", "여행", "음식")
- Maximum 3 tags
- No specific names, brands, or proper nouns as tags
- Korean only

Response format:
{
  "summary": "2~3 sentence summary in Korean",
  "tags": ["카테고리1", "카테고리2"]
}`,
      },
    ],
  });
  const raw = (message.content[0] as { type: "text"; text: string }).text;
  const text = raw
    .replace(/^```(?:json)?\n?/, "")
    .replace(/\n?```$/, "")
    .trim();
  const json = JSON.parse(text);

  return { summary: json.summary, tags: json.tags };
};
