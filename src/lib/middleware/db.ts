import prisma from '../prisma'
import { Request } from '../middleware/types'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

export default async function database(
  req: Request,
  _res: NextApiResponse,
  next: NextHandler
) {
  req.db = prisma

  next()
}
