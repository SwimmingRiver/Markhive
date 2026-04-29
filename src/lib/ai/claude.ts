import { AnalyzeInput } from "./types";

/* CLAUDE ai의 api를 사용할 예정 
- 태그 분류
- 요약 생성
- 개발 환경에서는 mock.ts로 대체 
- 프로덕션 환경에서 사용
*/

export const claude = (input: AnalyzeInput) => {
  return {
    summary: "이것은 mock 요약입니다. 실제 AI 연동 전 테스트용 데이터입니다.",
    tags: ["mock", "test"],
  };
};
