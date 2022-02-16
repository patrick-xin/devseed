import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.patch(async ({ db, query }, res) => {
  const id = query.id as string

  try {
    const likeId = await db.like.findFirst({
      where: { markId: id },
      select: { id: true },
    })

    await db.mark.update({
      where: { id },
      data: {
        like: {
          delete: { id: likeId?.id },
        },
      },
    })

    res.status(200).json({
      message: 'Upvoted!',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Try again later.',
    })
  }
})

export default handler
