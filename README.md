# Diarity 프론트엔드

## 소개 

Diarity는 사용자가 자기가 읽은 책과 간단한 독후감을 기록하고 관리할 수 있는 웹 애플리케이션입니다.

이 레포지토리는 Diarity의 프론트엔드를 NestJS로 구현한 것입니다.

자세한 개발기는 [altair의 프로젝트 일기](https://altair823.tistory.com/)를 참고해주세요.

## 기술 스택

- React
- Next.js 15
- TypeScript
- Tailwind CSS
- Zustand
- Tiptap

## 설치 및 실행 방법

### Bare metal 및 테스트

```bash
git clone
cd diarity-web-fe
npm install
next run dev
```

### Docker

도커 이미지를 통한 실행은 Private Registry인 Harbor를 통해 이루어집니다.
이 Harbor 저장소에 대한 접근 권한이 필요한 경우 이슈에 남겨주세요.

```bash
docker login harbor.altair823.xyz -u ${HARBOR_USERNAME} -p ${HARBOR_PASSWORD}
docker pull harbor.altair823.xyz/diarity-web-fe/diarity-web-fe:{TAG}
docker run -d \
  --name diarity-web-fe \
  --restart always \
  -p 3000:3000 \
  harbor.altair823.xyz/diarity-web-fe/diarity-web-fe:{TAG}
```