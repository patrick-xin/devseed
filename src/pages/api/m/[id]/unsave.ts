import { NextApiResponse } from 'next'
import nc from 'next-connect'

import { Request } from '@/lib/middleware/types'
import middleware from '@/lib/middleware'
import authHandler from '@/lib/middleware/auth'

const handler = nc<Request, NextApiResponse>()

handler.use(middleware)

handler.use(authHandler)

handler.patch(async (_, res) => {
  try {
    res.status(200).json({
      message: 'Mark has been added to the collection.',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Try again later.',
    })
  }
})

export default handler
