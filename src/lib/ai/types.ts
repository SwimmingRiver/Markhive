export type AnalyzeInput = {
  url: string
  title: string | null
  description: string | null
}

export type AnalyzeOutput = {
  summary: string
  tags: string[]
}
