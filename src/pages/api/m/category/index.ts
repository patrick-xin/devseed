import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'

const handler = nc<Request, NextApiResponse>()
handler.use(middleware)

handler.get(async ({ db }, res) => {
  const data = await db.category.findMany({
    select: { name: true, id: true },
  })

  const category = data.map((d) => ({ label: d.name, value: d.name }))

  res.status(200).json(category)
})

export default handler
