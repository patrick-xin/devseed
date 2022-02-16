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
    include: { tags: true, author: true },
  })
  const category = data?.tags.map((d) => ({ label: d.name, value: d.name }))
  res.status(200).json({ ...data, category })
})

handler.delete(async ({ db, query }, res) => {
  const id = query.id as string

  const mark = await db.mark.delete({
    where: {
      id: id,
    },
    select: { tags: true, title: true, url: true, description: true },
  })

  res.status(200).json(mark)
})

handler.patch(async ({ db, user, query, body }, res) => {
  const id = query.id as string

  const { title, markLink, description, tags, type } = body

  const categoryData = tags.map((c: { value: string }) => ({
    where: { name: c.value },
    create: { name: c.value },
  }))

  try {
    await db.mark.update({
      where: { id },
      data: {
        author: { connect: { id: user.id } },
        title,
        description,
        url: markLink,
        type,

        tags: {
          connectOrCreate: categoryData,
        },
      },
    })
    res.status(200).json({
      message: 'Mark has been updated',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Action could not complete, try again later',
    })
  }
})

export default handler
