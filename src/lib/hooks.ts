import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getTags, getUser, getUserMark, likeMark } from 'services/api'

export const useTags = () => {
  const { data } = useQuery(`/api/m/tag`, getTags)

  return {
    isLoading: !data,
    tags: data,
  }
}

export const useUser = () => {
  const { data: session, status } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
  })

  return {
    user: data,
    status,
    session,
  }
}

export const useUserLikes = () => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
    select: (data) => data.likes.map((l) => l.markId),
  })
  return { userLikes: data }
}

export const useUserMarks = () => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
    select: (data) => data.marks.map((m) => m.id),
  })
  return { userMarks: data }
}

export const useUserMark = (id: string) => {
  const { data } = useQuery(['mark', id], () => getUserMark(id))

  return {
    mark: data,
    isLoading: !data,
  }
}

export const useLikeMark = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation((id: string) => likeMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('marks')
    },
  })
  return { likeMark: mutate, isLoading }
}
