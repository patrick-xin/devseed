import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.get(async ({ db, query }, res) => {
  const limit = 6

  const cursor = (query.cursor as string) ?? ''
  const cursorObj = cursor === '' ? undefined : { id: cursor }
  const order = query.order as 'asc' | 'desc'
  try {
    const marks = await db.mark.findMany({
      orderBy: { createdAt: order },
      take: limit,
      skip: cursor == '' ? 0 : 1,
      cursor: cursorObj,
      select: {
        author: { select: { image: true, name: true } },
        tags: { select: { name: true } },
        createdAt: true,
        description: true,
        id: true,
        url: true,
        title: true,
        type: true,
        _count: { select: { likes: true, comments: true } },
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
