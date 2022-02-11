import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.post(async ({ db, user, body }, res) => {
  const { title, markLink, description, category } = body

  const categoryData = category.map((c) => ({
    where: { name: c.value },
    create: { name: c.value },
  }))
  await db.mark.create({
    data: {
      author: { connect: { id: user.id } },
      title,
      description,
      url: markLink,
      category: {
        connectOrCreate: categoryData,
      },
    },
  })
  res.status(200).json({
    message: 'Mark has been created',
  })
})

export default handler
