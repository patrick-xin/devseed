import { markTypes } from '../constants'

export type Mark = {
  id: string
  title: string
  authorId: string
  author: { name: string; image: string; id: string }
  tags: { name: string }[]
  url: string
  description: string
  _count: { collection: number; comments: number; like: number }
  createdAt: string
  type: string
}

export type Collection = {
  createdAt: string
  mark: Mark[]
}

export type User = {
  id: string
  image: string
  marks: Mark[]
  name: string
  collection: Collection[]
  like: { markId: string }[]
}

export type Like = {
  id: string
  createdAt: string
  markId: string
  userId: string
}

export type MarkType = typeof markTypes[number]
