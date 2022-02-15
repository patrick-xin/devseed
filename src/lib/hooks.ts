import { Tag } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createMark,
  getPopularTags,
  getTags,
  getUser,
  getUserMark,
  likeMark,
  updateMark,
} from 'services/api'
import { useMarkFormModalStore } from './store/modal'
import { useToastStore } from './store/toast'

export const usePopularTags = () => {
  const { data, isLoading } = useQuery<Tag[]>(`/api/m/tag/like`, getPopularTags)

  return {
    isLoadingPopularTags: isLoading,
    populatTags: data,
  }
}

export const useTags = () => {
  const { data, isLoading } = useQuery(`/api/m/tag`, getTags)

  return {
    isLoadingTags: isLoading,
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
  const { data, isLoading } = useQuery(['mark', id], () => getUserMark(id))

  return {
    mark: data,
    isLoadingMark: isLoading,
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

export const useCreateMark = () => {
  const { toast } = useToastStore()
  const { closeModal } = useMarkFormModalStore()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createMark, {
    onSuccess: () => {
      queryClient.invalidateQueries('marks')
      queryClient.invalidateQueries('user')
      closeModal()
      toast.success('Mark created', 'topRight', 'fadeLeft')
    },
  })
  return {
    createMark: mutate,
    isLoading,
  }
}

export const useEditMark = () => {
  const { toast } = useToastStore()
  const queryClient = useQueryClient()
  const { closeModal } = useMarkFormModalStore()
  const { mutate, isLoading } = useMutation(updateMark, {
    onSuccess: () => {
      queryClient.invalidateQueries('marks')
      closeModal()
      toast.success('Mark updated', 'topRight', 'fadeLeft')
    },
  })
  return {
    editMark: mutate,
    isLoading,
  }
}
