import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export const useCategory = () => {
  const { data } = useSWR(`/api/m/category`)

  return {
    isLoading: !data,
    category: data,
  }
}

export const useUser = () => {
  const { data: session, status } = useSession()
  const { data } = useSWR('/api/me')

  return {
    user: data,
    status,
    session,
  }
}

export const useUserMark = (id: string) => {
  const { data } = useSWR(`/api/m/${id}`)

  return {
    mark: data,
    isLoading: !data,
  }
}
