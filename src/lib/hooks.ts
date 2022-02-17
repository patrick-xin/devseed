import { Tag } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createMark,
  deleteMark,
  downvoteMark,
  getMark,
  getPopularTags,
  getTags,
  getUser,
  getUserMark,
  likeMark,
  submitComment,
  updateMark,
  upvoteMark,
} from 'services/api'
import { useConfirmModalStore } from './store/confirm-modal'
import { useMarkFormModalStore } from './store/modal'
import { useToastStore } from './store/toast'

export const usePopularTags = () => {
  const { data, isLoading } = useQuery<Tag[]>(`popularTags`, getPopularTags)

  return {
    isLoadingPopularTags: isLoading,
    populatTags: data,
  }
}

export const useTags = () => {
  const { data, isLoading } = useQuery(`tags`, getTags)

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

export const useUserPreference = () => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
    select: (data) => {
      const marks = data.marks.map((m) => m.id)
      const collections = data.collection.map((c) => c.mark[0].id)
      const likes = data.like.map((l) => l.markId)
      return { marks, collections, likes }
    },
  })
  return { userPreference: data }
}

export const useUserMark = (id: string) => {
  const { data, isLoading } = useQuery(['mark', id], () => getUserMark(id), {
    enabled: !!id,
  })

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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries('marks')
      queryClient.invalidateQueries(['mark', id])
      closeModal()
      toast.success('Mark updated', 'topRight', 'fadeLeft')
    },
  })
  return {
    editMark: mutate,
    isLoading,
  }
}

export const useUpvoteMark = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation((id: string) => upvoteMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('marks')
    },
  })
  return { upvoteMark: mutate, isLoading }
}

export const useDownvoteMark = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation((id: string) => downvoteMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('marks')
    },
  })
  return { downvoteMark: mutate, isLoading }
}

export const useGetMark = (id: string) => {
  const { data, isLoading } = useQuery(['mark', id], () => getMark(id))

  return {
    mark: data,
    isLoadingMark: isLoading,
  }
}

export const useSubmitComment = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ id, content }: { id: string; content: string }) =>
      submitComment({ id, content }),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['mark', id])
      },
    }
  )
  return { submitComment: mutate, isSubmitting: isLoading }
}

export const useDeleteMark = () => {
  const queryClient = useQueryClient()
  const { toast } = useToastStore()
  const { closeModal } = useConfirmModalStore()
  const { mutate, isLoading } = useMutation((id: string) => deleteMark(id), {
    onSuccess: (data) => {
      console.log(data)

      queryClient.invalidateQueries(['user'])
      queryClient.invalidateQueries(['marks'])
      closeModal()
      toast.success('Mark deleted')
    },
  })
  return { deleteMark: mutate, isDeleting: isLoading }
}
