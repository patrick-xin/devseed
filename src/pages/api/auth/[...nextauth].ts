import GithubProvider from 'next-auth/providers/github'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async session({ session, user, token }) {
        return { ...session, userId: token.id }
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (token && user) {
          return { ...token, id: `${user.id}`, isNewUser }
        }

        return token
      },
    },
    pages: {
      signIn: '/login',
      //newUser: '/welcome',
    },
  })

export default handler
