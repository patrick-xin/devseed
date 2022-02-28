import { markTypes } from '../constants'

export type Mark = {
  id: string
  title: string
  authorId: string
  author: { username: string; image: string; id: string }
  tags: { name: string }[]
  url: string
  description: string
  _count: { collection: number; comments: number; like: number }
  createdAt: string
  type: string
  comments: Comment[]
}

export type Collection = {
  createdAt: string
  mark: Mark[]
  id: string
  folderId: string
  folder: Folder | null
  collectionMark: CollectionMark[]
}

export type CollectionMark = {
  createdAt: string
  mark: Mark
  id: string
  markId: string
  collectionId: string
  name?: string
  note?: string
}

export type Comment = {
  content: string
  user: {
    name: string
    image: string
  }
  createdAt: string
  id: string
}

export type User = {
  id: string
  image: string
  bio: string
  createdAt: string
  marks: Mark[]
  name: string
  username: string
  collection: Collection[]
  like: { markId: string }[]
  folder: Folder[]
  comment: Comment[]
  followers: Follower[]
  following: Following[]
  profile: {
    github: string
    website: string
    linkedIn: string
    facebook: string
    twitter: string
    about: string
    location: string
    skills: string
  }
}

export type Follower = {
  following: { username: string; id: string; bio: string }
}

export type Following = {
  follower: { username: string; id: string; bio: string }
}

export type Folder = {
  collectionId?: string
  id: string
  name: string
  count: number
  createdAt: string
  collection: Collection[]
}

export type Like = {
  id: string
  createdAt: string
  markId: string
  userId: string
}

export type MarkType = typeof markTypes[number]
