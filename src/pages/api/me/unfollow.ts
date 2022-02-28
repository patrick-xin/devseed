import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)
handler.use(authHandler)

handler.patch(async ({ db, user, body }, res) => {
  const unfollowerId = body.id as string
  const unfollowingId = user.id
  const unfollower = await db.user.findFirst({
    where: { id: unfollowingId },
    select: {
      username: true,
    },
  })
  const follows = await db.follow.findFirst({
    where: { followerId: unfollowerId, AND: { followingId: unfollowingId } },
  })

  try {
    const not = await db.notification.findFirst({
      where: {
        userId: unfollowerId,
        AND: { followsId: follows?.id },
      },
    })
    await db.notification.update({
      where: { id: not?.id },
      data: {
        message: {
          content: `starts following you.`,
          unfollower: unfollower?.username,
        },
        notificationType: 'FOLLOWER',
      },
    })
    await db.notification.create({
      data: {
        message: {
          content: `no longer follows you.`,
          unfollower: unfollower?.username,
        },
        notificationType: 'UNFOLLOW',
        userId: unfollowerId,
      },
    })
    await db.follow.delete({
      where: {
        id: follows!.id,
      },
    })
    res.status(200).json({ message: `operation succeed.` })
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error unfollowing user, please try agian later` })
  }
})
export default handler
