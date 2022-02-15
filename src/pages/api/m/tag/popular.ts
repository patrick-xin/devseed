import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()
handler.use(middleware)

handler.get(async ({ db }, res) => {
  const tags = await db.tag.findMany({
    orderBy: { marks: { _count: 'desc' } },
    take: 5,
    select: {
      id: true,
      name: true,
    },
  })

  res.status(200).json(tags)
})

export default handler
