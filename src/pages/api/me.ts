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
      collection: {
        include: { mark: true, folder: { select: { id: true, name: true } } },
      },
      like: { select: { markId: true } },
      folder: { include: { collection: { include: { mark: true } } } },
    },
  })

  res.status(200).json(profile)
})
export default handler
