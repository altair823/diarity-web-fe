import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_SUMMARY_TITLE_LENGTH = 20
const MAX_SUMMARY_CONTENT_LENGTH = 50
const MAX_RECENT_PAGES_COUNT = 5

interface RecentVisitedPage {
  url: string
  titleSummary: string
  contentSummary: string
  timestamp: number
}

interface RecentVisitedStore {
  version: string
  recentVisitedPages: RecentVisitedPage[]

  addPage: (page: RecentVisitedPage) => void
  removePage: (url: string) => void
  clearPages: () => void
}

function htmlTaggedToText(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export const useRecentVisited = create(
  persist<RecentVisitedStore>(
    (set) => ({
      version: process.env.NEXT_PUBLIC_RECENT_STORAGE_VERSION || '0.0.0',
      recentVisitedPages: [],
      addPage: (page: RecentVisitedPage) =>
        set((state) => {
          // 버전 검사: 다른 경우 recentVisitedPages 초기화
          let updatedPages = [...state.recentVisitedPages];
          if (
            !state.version ||
            state.version !== (process.env.NEXT_PUBLIC_RECENT_STORAGE_VERSION || '0.0.0')
          ) {
            updatedPages = []; // 페이지 리스트 초기화
          }

          page.titleSummary = htmlTaggedToText(page.titleSummary);
          page.contentSummary = htmlTaggedToText(page.contentSummary);
          const exists = updatedPages.some((p) => p.url === page.url);

          if (page.titleSummary.length > MAX_SUMMARY_TITLE_LENGTH) {
            page.titleSummary = page.titleSummary.slice(0, MAX_SUMMARY_TITLE_LENGTH) + '...';
          }
          if (page.contentSummary.length > MAX_SUMMARY_CONTENT_LENGTH) {
            page.contentSummary = page.contentSummary.slice(0, MAX_SUMMARY_CONTENT_LENGTH) + '...';
          }

          if (!exists) {
            const newPage = { ...page, timestamp: new Date().getTime() };
            updatedPages = [...updatedPages, newPage];
          } else {
            updatedPages = updatedPages.map((p) =>
              p.url === page.url ? { ...p, timestamp: new Date().getTime() } : p
            );
          }

          updatedPages.sort((a, b) => b.timestamp - a.timestamp);

          return {
            version: process.env.NEXT_PUBLIC_RECENT_STORAGE_VERSION || '0.0.0',
            recentVisitedPages: updatedPages.slice(0, MAX_RECENT_PAGES_COUNT),
          };
        }),

      removePage: (url: string) =>
        set((state) => {
          let updatedPages = [...state.recentVisitedPages];

          // 버전 검사: 다른 경우 recentVisitedPages 초기화
          if (
            !state.version ||
            state.version !== (process.env.NEXT_PUBLIC_RECENT_STORAGE_VERSION || '0.0.0')
          ) {
            updatedPages = []; // 페이지 리스트 초기화
          }

          // 이후 로직 계속 실행 - 지정된 URL 제거
          updatedPages = updatedPages.filter((page) => page.url !== url);

          return {
            version: process.env.NEXT_PUBLIC_RECENT_STORAGE_VERSION || '0.0.0',
            recentVisitedPages: updatedPages,
          };
        }),
      clearPages: () => set({ recentVisitedPages: [] }),
    }),
    {
      name: 'recent-visited-storage',
    }
  )
)
