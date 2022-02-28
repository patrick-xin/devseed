import { User } from '@/lib/types'

export const getUser = async (): Promise<User> => {
  const data = await fetch(`/api/me`)
  return data.json()
}

export const getUserMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}`)
  return data.json()
}

export const createFolder = async ({ name }: { name: string }) => {
  const data = await fetch(`/api/folder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  })
  return data.json()
}

export const moveCollectionToFolder = async ({
  collectionId,
  folderId,
}: {
  collectionId: string
  folderId: string
}) => {
  const data = await fetch(`/api/folder`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectionId,
      folderId,
    }),
  })
  return data.json()
}
