import { PrismaClient } from '.prisma/client'

import { NextApiRequest } from 'next'
import { JWT } from 'next-auth/jwt'

export interface User extends JWT {
  id: string
}
export interface Request extends NextApiRequest {
  db: PrismaClient
  user: User
}
