import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)
declare const SortOrder: {
  asc: 'asc'
  desc: 'desc'
}

handler.get(async ({ db, query }, res) => {
  const limit = 6
  const sortOrder: typeof SortOrder['desc'] = 'desc'
  const cursor = (query.cursor as string) ?? ''
  const cursorObj = cursor === '' ? undefined : { id: cursor }
  let orderBy
  const order = query.orderBy
  if (order === 'newest') {
    orderBy = { createdAt: sortOrder }
  }
  if (order === 'comments') {
    orderBy = { comments: { _count: sortOrder } }
  }
  if (order === 'saved') {
    orderBy = { collection: { _count: sortOrder } }
  }
  if (order === 'liked') {
    orderBy = { like: { _count: sortOrder } }
  }

  try {
    const marks = await db.mark.findMany({
      orderBy,
      take: limit,
      skip: cursor == '' ? 0 : 1,
      cursor: cursorObj,
      select: {
        author: { select: { image: true, username: true } },
        tags: { select: { name: true } },
        createdAt: true,
        description: true,
        id: true,
        url: true,
        title: true,
        type: true,
        like: true,
        _count: { select: { collection: true, comments: true, like: true } },
      },
    })

    res.status(200).json({
      marks,
      nextId: marks.length === limit ? marks[limit - 1].id : undefined,
    })
  } catch (error) {
    res.status(500).json({
      message: "Can't reach server at the moment, please come back later.",
    })
  }
})

export default handler
