import {
  createFolder,
  getUser,
  getUserMark,
  moveCollectionToFolder,
} from './api'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useToastStore } from '@/lib/store/toast'
import { patch } from '@/utils'
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

export const useUserFolders = () => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
    select: (data) => {
      return data.folder
    },
  })
  return { userFolders: data }
}
export const useUserFolderCollections = (queryId: string | undefined) => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session) && Boolean(queryId),
    select: (data) => {
      return data.folder.find((folder) => folder.id === queryId)?.collection
    },
  })
  return { folderCollections: data }
}

export const useUserCollections = () => {
  const { data: session } = useSession()
  const { data } = useQuery('user', getUser, {
    enabled: Boolean(session),
    select: (data) => {
      return data.collection
    },
  })
  return { userCollections: data }
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

export const useCreateFolder = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ name }: { name: string }) => createFolder({ name }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      },
    }
  )
  return { createFolder: mutate, isCreatingFolder: isLoading }
}

export const useMoveCollectionToFolder = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ collectionId, folderId }: { collectionId: string; folderId: string }) =>
      moveCollectionToFolder({ collectionId, folderId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      },
    }
  )
  return { moveCollectionToFolder: mutate, isMoving: isLoading }
}

export const useFollow = ({
  userId,
  username,
}: {
  userId: string
  username: string
}) => {
  const queryClient = useQueryClient()
  const { toast } = useToastStore()
  const { mutate, isLoading } = useMutation(
    () => {
      return patch('/api/user/follow', { id: userId })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        toast.success(`You have followed ${username}`)
      },
      onError: () => {
        toast.error(`Error following user, try again later...`)
      },
    }
  )
  return { follow: mutate, isFollowLoading: isLoading }
}

export const useUnfollow = ({
  userId,
  username,
}: {
  userId: string
  username: string
}) => {
  const queryClient = useQueryClient()
  const { toast } = useToastStore()
  const { mutate, isLoading } = useMutation(
    () => {
      return patch('/api/user/unfollow', { id: userId })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        toast.success(`You have unfollowed ${username}`)
      },
      onError: (error) => {
        if (error instanceof Error) toast.error(error.message)
      },
    }
  )
  return { unfollow: mutate, isUnfollowLoading: isLoading }
}
