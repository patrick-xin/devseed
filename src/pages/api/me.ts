import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)
handler.use(authHandler)

handler.get(async ({ db, user }, res) => {
  const profile = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      image: true,
      name: true,
      marks: true,
      likes: true,
      collection: {
        select: {
          mark: {
            select: { url: true, id: true, title: true, description: true },
          },
        },
      },
    },
  })

  res.status(200).json(profile)
})
export default handler
