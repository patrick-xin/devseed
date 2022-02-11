import { Request } from '../middleware/types'
import { NextApiResponse } from 'next'
import nc from 'next-connect'
import database from './db'

const middleware = nc<Request, NextApiResponse>({
  onError: (err, _, res: NextApiResponse) => {
    res.status(500).end(err.toString())
  },
  onNoMatch: (_, res: NextApiResponse) => {
    res.status(405).send('Method Not Allowed')
  },
})

middleware.use(database)
export default middleware
