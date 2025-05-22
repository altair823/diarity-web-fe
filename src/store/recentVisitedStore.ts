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
      recentVisitedPages: [],
      addPage: (page: RecentVisitedPage) =>
        set((state) => {
          page.titleSummary = htmlTaggedToText(page.titleSummary)
          page.contentSummary = htmlTaggedToText(page.contentSummary)
          const exists = state.recentVisitedPages.some(
            (p) => p.url === page.url
          )
          if (page.titleSummary.length > MAX_SUMMARY_TITLE_LENGTH) {
            page.titleSummary =
              page.titleSummary.slice(0, MAX_SUMMARY_TITLE_LENGTH) + '...'
          }
          if (page.contentSummary.length > MAX_SUMMARY_CONTENT_LENGTH) {
            page.contentSummary =
              page.contentSummary.slice(0, MAX_SUMMARY_CONTENT_LENGTH) + '...'
          }
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
