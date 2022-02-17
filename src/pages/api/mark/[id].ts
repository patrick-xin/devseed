import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.get(async ({ db, query }, res) => {
  const id = query.id as string
  const data = await db.mark.findUnique({
    where: { id },
    include: {
      author: true,
      tags: true,
      comments: {
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })
  const category = data?.tags.map((d) => ({ label: d.name, value: d.name }))

  res.status(200).json({ ...data, category })
})

export default handler
