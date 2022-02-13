export type MarkType = 'Article' | 'Website' | 'Video'

export type Mark = {
  id: string
  title: string
  author: { name: string; image: string }
  tags: { name: string }[]
  url: string
  description: string
  _count: { likes: number; comments: number }
  createdAt: string
  type: string
}

export type User = {
  id: string
  image: string
  likes: Like[]
  marks: Mark[]
  name: string
  collection: { mark: Mark }[]
}

export type Like = {
  id: string
  createdAt: string
  markId: string
  userId: string
}
