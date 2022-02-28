import { useMarkFormModalStore } from '@/lib/store/modal'
import { useToastStore } from '@/lib/store/toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Tag } from '@prisma/client'
import {
  createMark,
  deleteMark,
  downvoteMark,
  getMark,
  getPopularTags,
  getTags,
  saveMark,
  unSaveMark,
  updateMark,
  upvoteMark,
} from './api'
import { useConfirmModalStore } from '@/lib/store/confirm-modal'

export const useSaveMark = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation((id: string) => saveMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('marks')
    },
  })
  return { saveMark: mutate, isLoading }
}

export const useUnsaveMark = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation((id: string) => unSaveMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      queryClient.invalidateQueries('marks')
    },
  })
  return { unSaveMark: mutate, isLoading }
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

export const useDeleteMark = () => {
  const queryClient = useQueryClient()
  const { toast } = useToastStore()
  const { closeModal } = useConfirmModalStore()
  const { mutate, isLoading } = useMutation((id: string) => deleteMark(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      queryClient.invalidateQueries(['marks'])
      closeModal()
      toast.success('Mark deleted')
    },
  })
  return { deleteMark: mutate, isDeleting: isLoading }
}

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
