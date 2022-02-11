import { getToken } from 'next-auth/jwt'
import { Request, User } from '../middleware/types'
import { NextApiResponse, NextApiRequest } from 'next'
import { NextHandler } from 'next-connect'

const secret = process.env.JWT_SECRET!

export default async function authHandler(
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) {
  // @ts-ignore:next-line
  const token = await getToken({ req, secret })

  if (token) {
    // Signed in
    req.user = token as User

    next()
  } else {
    // Not Signed in
    res.status(401)
    res.end()
  }
}
