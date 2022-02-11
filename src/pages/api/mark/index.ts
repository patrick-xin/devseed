import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'

import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.get(async ({ db }, res) => {
  const marks = await db.mark.findMany({
    include: {
      author: { select: { image: true, name: true } },
      category: { select: { name: true } },
    },
  })

  res.status(200).json(marks)
})

export default handler
