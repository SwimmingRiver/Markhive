# markhive 에이전트 환경 설계

**날짜:** 2026-06-08  
**상태:** 승인됨

## 목적

markhive 프로젝트의 개발 워크플로우를 전문화된 에이전트 팀으로 강화한다. 현재 단일 범용 Claude Code가 모든 작업을 처리하는 구조를 계층형 멀티에이전트 체계로 전환해 각 도메인에서 더 깊은 전문성을 확보한다.

## 아키텍처

### 계층형 오케스트레이터 모델

```
사용자 요청
    ↓
markhive-orchestrator (Sonnet · 노란색) — 진입점 · 라우터
    ├── markhive-frontend    (Sonnet · 파란색) — 구현
    ├── markhive-reviewer    (Sonnet · 주황색) — 코드 리뷰
    ├── markhive-tester      (Sonnet · 초록색) — 테스트
    ├── markhive-improvements (Haiku · 청록색) — 개선 분석
    └── markhive-scheduler   (Haiku · 보라색)  — 일정 관리 (기존)
```

## 에이전트 목록

| 에이전트 | 파일 | 모델 | 역할 |
|---|---|---|---|
| `markhive-orchestrator` | `.claude/agents/markhive-orchestrator.md` | Sonnet | 라우터 · 코디네이터 |
| `markhive-frontend` | `.claude/agents/markhive-frontend.md` | Sonnet | 시니어 프론트엔드 개발자 |
| `markhive-reviewer` | `.claude/agents/markhive-reviewer.md` | Sonnet | 코드 리뷰 전문가 |
| `markhive-tester` | `.claude/agents/markhive-tester.md` | Sonnet | 테스트 전문가 |
| `markhive-improvements` | `.claude/agents/markhive-improvements.md` | Haiku | 개선점 분석가 |
| `markhive-scheduler` | `.claude/agents/markhive-scheduler.md` | Haiku | 일정 관리 (기존 유지) |

## 라우팅 규칙

- **단순 요청** → 해당 전문 에이전트 직접 호출
- **복합 요청** → orchestrator가 순차 위임 후 결과 통합
- **도메인 불명확** → orchestrator가 분석 후 추천

## 메모리 구조

`markhive-frontend`만 project 메모리를 가짐 (구현 패턴 축적).
나머지 에이전트는 stateless로 운영.
