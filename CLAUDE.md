# CLAUDE.md

## 프로젝트 개요

JSON/YAML 파일 하나로 여행 일정을 정의하면 모던한 타임라인 웹페이지가 생성되어 GitHub Pages로 배포되는 정적 웹 앱. 자세한 스펙은 `PROJECT.md` 참고.

## 기술 스택

- React + Vite + TypeScript
- Tailwind CSS
- Vitest (단위 테스트)
- GitHub Pages + GitHub Actions

## 컨벤션

**컴포넌트**
- 함수형 컴포넌트만 사용
- 컴포넌트는 폴더 단위로 분리 (`ComponentName/index.tsx`)

**커밋 메시지**
Conventional Commits 형식을 따른다.
```
<type>(<scope>): <description>

type: feat | fix | style | refactor | test | chore | docs
```

**테스트**
- 로직이 있는 코드는 단위 테스트 작성 (Vitest)
- 파서, 훅, 유틸 함수 위주로 작성

## 주의사항

- 라우터는 `HashRouter`를 사용한다. GitHub Pages에서 BrowserRouter + 404.html 핵이 불안정해서 교체함. URL은 `/#/sample` 형식.
- `any` 타입 사용 금지
- Phase 1 완료 전에 Phase 2 기능 미리 구현하지 말 것
