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
      username: true,
      following: {
        select: {
          follower: { select: { username: true } },
        },
      },
      followers: {
        select: {
          following: { select: { username: true } },
        },
      },
      collection: {
        include: {
          folder: { select: { id: true, name: true } },
          collectionMark: {
            include: {
              mark: {
                select: {
                  id: true,
                  url: true,
                  title: true,
                  description: true,
                  createdAt: true,
                  author: {
                    select: { name: true, image: true },
                  },
                },
              },
            },
          },
        },
      },
      like: { select: { markId: true } },
      folder: {
        include: {
          collection: {
            include: {
              collectionMark: { include: { mark: true } },
            },
          },
        },
      },
    },
  })

  res.status(200).json(profile)
})
export default handler
