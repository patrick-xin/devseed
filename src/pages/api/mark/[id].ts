import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.get(async ({ db, query }, res) => {
  const id = query.id as string
  const mark = await db.mark.findUnique({
    where: { id },

    include: {
      author: { select: { image: true, name: true } },
      category: { select: { name: true } },
    },
  })

  res.status(200).json(mark)
})

export default handler
