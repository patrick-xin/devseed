import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.post(async ({ db, user, body }, res) => {
  const { name } = body
  try {
    await db.folder.create({
      data: {
        userId: user.id,
        name,
      },
    })
    res.status(200).json({
      message: 'Mark has been created',
    })
  } catch (err) {
    res.status(500).json({
      message: 'Try again later',
    })
  }
})

handler.patch(async ({ db, body }, res) => {
  const { collectionId, folderId } = body

  await db.folder.update({
    where: { id: folderId },

    data: {
      collection: { connect: { id: collectionId } },
    },
  })
  res.status(200).json({
    message: 'Mark has been created',
  })
})

export default handler
