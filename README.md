# Re:Catch Test

## 프로젝트 개요

- Front-end Engineer 포지션의 입사 과제 전형 프로젝트
- 회원 목록을 관리할 수 있는 테이블 만들기
- AntD 사용하여 회원 엔티티의 CRUD 구현
- env variable 에 따라 레코드를 in-memory 또는 local-storage 에 저장
- [과제안내링크](https://businesscanvas.notion.site/1158a6dbf83980488d96cbfcd9bc3426)
- [디자인 피그마 링크](https://www.figma.com/design/dxmIaXbozcjrztnYsOOb8D/개발-과제?node-id=1-38232&t=vJhru0a6IFQ4sdoz-0)

### 프로젝트 구조

#### FSD (Feature-Sliced Design) 구조 사용 ([참고링크](https://wonderfulwonder.tistory.com/110))

- 레이어, 슬라이스, 세그먼트 구조를 통해 구조화하여 소스의 파편화를 방지
- `app` 으로부터 `shared` 방향으로만 참조하고 역방향으로는 참조하지 않도록 하여 순환참조를 방지

```text
app/                            // [루트 단위]
  providers/                    // 콘텍스트 프로바이더 (zustand, react-router, tanstack-query 등)
  ui/                           // App UI, 스타일
    main.tsx
    App.tsx

pages/                          // [페이지 단위]
  UserPage.tsx                 // 회원 목록 페이지(단일 파일 또는 폴더로 구성)

widgets/                        // [위젯 단위] (기능 및 엔티티 단위의 조합)
  [SomeWidget].tsx             // entity, feature 의 조합(단일 파일 또는 폴더로 구성)

features/                       // [기능 단위]
  [some-feature]/
    api/                        // API
    model/                      // 훅(엔티티의 모델 사용하여 비지니스 로직 구현)
    ui/                         // UI

entities/                       // [엔티티 단위]
  user/                         // 회원 엔티티
    api/                        // 회원 Api 서비스
    model/                      // 회원 엔티티 모델, Zustand 스토어
    ui/                         // 회원 엔티티 공통 UI

shared/                         // [공통]
  api/                          // baseApi 인터페이스
  assets/                       // 리소스 파일 (png, svg)
  config/                       // 공통 설정 (app config, routes 등)
  lib/                          // 공통 라이브러리
    hooks/                      // 공통 훅
    utils                       // 공통 유틸
  ui/                           // 공통 UI 콤포넌트 (레이아웃 등, 단일 파일 또는 폴더로 구성)
```

### 사용된 라이브러리 목록

- [Vite](https://ko.vite.dev/guide/)
- [React 18.3.1](https://18.react.dev)
- [React-router](https://reactrouter.com/6.28.0/start/overview)
- [Ant Design](https://ant.design)
- [Ant Design Icons](https://ant.design/components/icon)
- [Zustand](https://zustand.docs.pmnd.rs)
- [Tanstack-query](https://tanstack.com/query/latest)
- [Dayjs](https://day.js.org)
- [uuid](https://www.npmjs.com/package/uuid)

## 시작하기

```sh
npm install
npm run dev
```

## 빌드하기

```sh
npm run build
```

## 미리보기

```sh
npm run preview
```
