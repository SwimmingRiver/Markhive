import { AnalyzeInput, AnalyzeOutput } from './types'

export async function mockAnalyze(input: AnalyzeInput): Promise<AnalyzeOutput> {
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    summary: '이것은 mock 요약입니다. 실제 AI 연동 전 테스트용 데이터입니다.',
    tags: ['mock', 'test'],
  }
}
