import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json())

export function useGetUserPosts(userId: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/posts`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { userPosts: data, isError: error, isLoading }
}

export function useGetUserPostsByCount(userId: string, count: number) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/posts?count=${count}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { userPosts: data, isError: error, isLoading }
}

export function useGetUserProfile(userId: number) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { userProfile: data, isError: error, isLoading }
}
