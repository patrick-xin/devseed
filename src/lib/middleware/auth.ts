import { getToken } from 'next-auth/jwt'
import { Request, User } from '../middleware/types'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const secret = process.env.JWT_SECRET!

export default async function authHandler(
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) {
  const token = await getToken({ req, secret })

  if (token) {
    req.user = token as User

    next()
  } else {
    res.status(401)
    res.end()
  }
}
