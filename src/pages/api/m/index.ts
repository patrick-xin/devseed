import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.post(async ({ db, user, body }, res) => {
  const { title, markLink, description, tags, type } = body

  const categoryData = tags.map((c: { value: string }) => ({
    where: { name: c.value },
    create: { name: c.value },
  }))
  try {
    await db.mark.create({
      data: {
        author: { connect: { id: user.id } },
        title,
        description,
        url: markLink,
        tags: {
          connectOrCreate: categoryData,
        },
        type: type.toUpperCase(),
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

handler.patch(async ({ db, user, body }, res) => {
  const { title, markLink, description, category, type } = body

  const categoryData = category.map((c: { value: string }) => ({
    where: { name: c.value },
    create: { name: c.value },
  }))
  await db.mark.create({
    data: {
      author: { connect: { id: user.id } },
      title,
      description,
      url: markLink,
      tags: {
        connectOrCreate: categoryData,
      },
      type,
    },
  })
  res.status(200).json({
    message: 'Mark has been created',
  })
})

export default handler
