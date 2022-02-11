import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.get(async ({ db, query }, res) => {
  const id = query.id as string

  const data = await db.mark.findUnique({
    where: { id },
    include: { category: true },
  })
  const category = data?.category.map((d) => ({ label: d.name, value: d.name }))
  res.status(200).json({ ...data, category })
})

handler.delete(async ({ db, query, user }, res) => {
  const id = query.id as string

  const mark = await db.mark.delete({
    where: {
      id: id,
    },
    select: { category: true, title: true, url: true, description: true },
  })

  res.status(200).json(mark)
})

handler.patch(async ({ db, user, query, body }, res) => {
  const id = query.id as string
  const { title, markLink, description, category } = body

  const categoryData = category.map((c) => ({
    where: { name: c.value },
    create: { name: c.value },
  }))
  await db.mark.update({
    where: { id },
    data: {
      author: { connect: { id: user.id } },
      title,
      description,
      url: markLink,
      category: {
        upsert: categoryData,
      },
    },
  })
  res.status(200).json({
    message: 'Mark has been updated',
  })
})

export default handler
