import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.patch(async ({ db, user, body }, res) => {
  const { content, id } = body

  try {
    await db.mark.update({
      where: { id },
      data: {
        comments: {
          create: {
            content,
            userId: user.id,
          },
        },
      },
    })

    res.status(200).json({
      message: 'Comment added.',
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error submitting comment, please try again later.',
    })
  }
})

export default handler
