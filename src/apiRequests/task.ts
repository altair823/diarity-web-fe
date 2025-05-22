import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json())

export function useGetUserProfile() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { userProfile: data, isError: error, isLoading }
}
