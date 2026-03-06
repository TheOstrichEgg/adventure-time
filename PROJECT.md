# Adventure Time

## 프로젝트 개요

JSON/YAML 파일 하나로 여행 일정을 정의하면 모던한 타임라인 웹페이지가 생성되어 GitHub Pages로 배포. 링크로 친구/가족에게 공유하는 용도.

## 기술 스택

**확정**
- React + Vite + TypeScript
- Tailwind CSS
- GitHub Pages + GitHub Actions

**잠정 (변경 가능)**
- Framer Motion
- Open-Meteo

## 스키마 정의

**meta**
```json
{
  "id": "string, 필수",
  "title": "string, 필수",
  "memo": "string, optional",
  "cover_image": "string, optional"
}
```

**day**
```json
{
  "title": "string, 필수",
  "date": "string (YYYY-MM-DD), 필수",
  "timezone": "string (IANA), optional, 기본값 Asia/Seoul",
  "locations": "string[], optional, 날씨용 도시명 배열",
  "events": "event[], 필수"
}
```

**event**
```json
{
  "title": "string, 필수",
  "time": "string (HH:mm), 필수",
  "time_end": "string (HH:mm), optional",
  "category": "enum, optional",
  "memo": "string, optional",
  "link": "string (URL), optional, 딥링크 지원",
  "image": "string (로컬 경로 or URL), optional",
  "required": "boolean, optional"
}
```

**category enum** — 파일 상단에 정의하고 이벤트에서 참조
```json
{
  "id": "string, 필수",
  "label": "string, 필수",
  "color": "string, 필수",
  "emoji": "string, optional"
}
```

## 라우팅 구조

- History 라우팅 사용
- URL 구조: `username.github.io/adventure-time/:id`
- `:id` 는 `meta.id` 기준
- GitHub Pages는 SPA 라우팅을 공식 지원하지 않으므로 `404.html` 핵 사용
  - `404.html` 에서 JS로 `index.html` 로 리다이렉트
  - 삭제하거나 수정하면 직접 URL 접근 및 새로고침이 깨짐

## 개발 단계

**Phase 1 - MVP**
- [ ] 프로젝트 셋업 (Vite + React + TypeScript + Tailwind)
- [ ] 스키마 + 타입 정의
- [ ] JSON 파싱
- [ ] 타임라인 뷰 (기본 UI)
- [ ] 딥링크 지원
- [ ] GitHub Pages 배포

**Phase 2**
- [ ] YAML 지원
- [ ] 날씨 (Open-Meteo)
- [ ] 다크모드
- [ ] 애니메이션 (Framer Motion)
- [ ] 카테고리 칩 필터
