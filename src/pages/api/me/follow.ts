import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)
handler.use(authHandler)

handler.patch(async ({ db, user, body }, res) => {
  const followerId = body.id as string
  const followingId = user.id
  const following = await db.user.findFirst({
    where: { id: followingId },
    select: {
      username: true,
    },
  })
  try {
    await db.follow.create({
      data: {
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
        notification: {
          create: {
            notificationType: 'FOLLOWER',
            userId: body.id,
            message: {
              content: `starts following you.`,
              follower: following?.username,
            },
          },
        },
      },
    })
    res.status(200).json({ message: `operation succeed.` })
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error following user, please try agian later` })
  }
})
export default handler
