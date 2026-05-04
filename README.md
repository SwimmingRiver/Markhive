# Markhive

URL을 저장하면 AI가 자동으로 요약하고 태그를 붙여주는 북마크 관리 앱입니다.

**[markhive-alpha.vercel.app](https://markhive-alpha.vercel.app/)**

## 기능

- **URL 저장** — 링크를 붙여넣으면 제목·설명·이미지를 자동으로 가져옵니다
- **AI 분석** — Claude가 페이지를 읽고 한국어 요약과 카테고리 태그를 생성합니다
- **라이브러리** — 저장한 북마크를 태그 필터와 읽음 여부로 정리할 수 있습니다
- **검색** — 제목, URL, 요약 내용을 기반으로 북마크를 검색합니다

## 기술 스택

| 영역      | 사용 기술                                          |
| --------- | -------------------------------------------------- |
| Frontend  | Next.js 16 (App Router), React 19, Tailwind CSS v4 |
| Backend   | Next.js API Routes, Supabase                       |
| AI        | Claude Haiku (`@anthropic-ai/sdk`)                 |
| 상태 관리 | TanStack React Query                               |
