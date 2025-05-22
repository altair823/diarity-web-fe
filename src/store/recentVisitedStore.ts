import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MAX_SUMMARY_LENGTH = 50
const MAX_RECENT_PAGES_COUNT = 5

interface RecentVisitedPage {
  url: string
  title: string
  contentSummary: string
  timestamp: number
}

interface RecentVisitedStore {
  recentVisitedPages: RecentVisitedPage[]
  addPage: (page: RecentVisitedPage) => void
  removePage: (url: string) => void
  clearPages: () => void
}

export const useRecentVisited = create(
  persist<RecentVisitedStore>(
    (set) => ({
      recentVisitedPages: [],
      addPage: (page: RecentVisitedPage) =>
        set((state) => {
          // 페이지가 이미 존재하는지 확인
          const exists = state.recentVisitedPages.some(
            (p) => p.url === page.url
          )
          page.contentSummary = page.contentSummary.slice(0, MAX_SUMMARY_LENGTH)
          if (!exists) {
            // 새로운 페이지 추가
            const newPage = { ...page, timestamp: new Date().getTime() }
            const updatedPages = [...state.recentVisitedPages, newPage]
            updatedPages.sort((a, b) => b.timestamp - a.timestamp)
            return {
              recentVisitedPages: updatedPages.slice(0, MAX_RECENT_PAGES_COUNT),
            }
          } else {
            // 기존 페이지 타임스탬프 업데이트
            const updatedPages = state.recentVisitedPages.map((p) =>
              p.url === page.url ? { ...p, timestamp: new Date().getTime() } : p
            )
            updatedPages.sort((a, b) => b.timestamp - a.timestamp)
            return {
              recentVisitedPages: updatedPages.slice(0, MAX_RECENT_PAGES_COUNT),
            }
          }
        }),
      removePage: (url: string) =>
        set((state) => ({
          recentVisitedPages: state.recentVisitedPages.filter(
            (page) => page.url !== url
          ),
        })),
      clearPages: () => set({ recentVisitedPages: [] }),
    }),
    {
      name: 'recent-visited-storage',
    }
  )
)
