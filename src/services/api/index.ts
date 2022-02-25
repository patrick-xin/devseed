import { Mark, User } from '@/lib/types'

const dev = process.env.NODE_ENV !== 'production'

export const API_BASE_URL = dev
  ? 'http://localhost:3000'
  : 'https://your_deployment.server.com'

export const createMark = async ({
  title,
  markLink,
  description,
  tags,
  type,
}: {
  title: string
  markLink: string
  description: string
  tags: string[]
  type: string
}) => {
  const data = await fetch('/api/m', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, markLink, description, tags, type }),
  })
  return data.json()
}

export const updateMark = async ({
  title,
  markLink,
  description,
  tags,
  type,
  id,
}: {
  title: string
  markLink: string
  description: string
  tags: string[]
  type: string
  id: string
}) => {
  const data = await fetch(`/api/m/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, markLink, description, tags, type }),
  })
  return data.json()
}

export const deleteMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}`, {
    method: 'DELETE',
  })
  return data.json()
}

export const getMark = async (id: string): Promise<Mark> => {
  const data = await fetch(`${API_BASE_URL}/api/mark/${id}`)
  return data.json()
}

export const getMarks = async ({ pageParam = '', order = 'desc' }) => {
  const data = await fetch(
    `${API_BASE_URL}/api/mark?order=${order}&cursor=${pageParam}`
  )
  return data.json()
}

export const getTrendingMarks = async ({ pageParam = '' }) => {
  const data = await fetch(
    `${API_BASE_URL}/api/mark/trending?cursor=${pageParam}`
  )
  return data.json()
}

export const saveMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}/save`, {
    method: 'PATCH',
  })
  return data.json()
}
export const unSaveMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}/unsave`, {
    method: 'PATCH',
  })
  return data.json()
}

export const upvoteMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}/upvote`, {
    method: 'PATCH',
  })
  return data.json()
}

export const downvoteMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}/downvote`, {
    method: 'PATCH',
  })
  return data.json()
}

export const getTags = async () => {
  const data = await fetch(`/api/m/tag`)
  return data.json()
}

export const getPopularTags = async () => {
  const data = await fetch(`/api/m/tag/popular`)
  return data.json()
}

export const getUser = async (): Promise<User> => {
  const data = await fetch(`/api/me`)
  return data.json()
}

export const getUserMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}`)
  return data.json()
}
export const submitComment = async ({
  id,
  content,
}: {
  id: string
  content: string
}) => {
  const data = await fetch(`/api/m/${id}/comment`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      id,
    }),
  })
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
