import { useMemo } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
// Hooks
import { useFollow, useUnfollow, useUser } from '@/user/hooks'

import { Button } from '@/components'
import { ProfileTab } from '@/user/components'

import { RequireLogin } from '@/components'
import { User } from '@/lib/types'
import prisma from '@/lib/prisma'
import { ProfileCard } from '@/user/components'

const UserPage = ({ user }: { user: User }) => {
  const { user: currentUser } = useUser()
  const isOwner = currentUser?.id === user.id

  const hasFollowed = useMemo(() => {
    return currentUser?.following
      .map((following) => following.follower.username)
      .includes(user.username)
  }, [currentUser, user])

  const { follow, isFollowLoading } = useFollow({
    userId: user.id,
    username: user.username,
  })

  const { unfollow, isUnfollowLoading } = useUnfollow({
    userId: user.id,
    username: user.username,
  })

  return (
    <div className="mx-auto max-w-7xl">
      <header className="bg-mint/10 flex gap-6 rounded-lg py-12 px-6">
        <div className="self-end">
          <h4 className="text-3xl font-black"> {user.username}</h4>
          <p>{user.bio}</p>
          <div className="flex items-center gap-4">
            <RequireLogin
              text="login to follow"
              functionChildren={() =>
                !isOwner ? (
                  hasFollowed ? (
                    <Button
                      disabled={isOwner || isUnfollowLoading}
                      title="unfollow"
                      type="button"
                      isLoading={isUnfollowLoading}
                      onClick={() => unfollow()}
                    >
                      unfollow
                    </Button>
                  ) : (
                    <Button
                      disabled={isOwner || isFollowLoading}
                      title="follow"
                      type="button"
                      isLoading={isFollowLoading}
                      onClick={() => follow()}
                    >
                      follow
                    </Button>
                  )
                ) : null
              }
            />
          </div>
        </div>
      </header>
      <div className="my-6 grid grid-cols-6 gap-12">
        <div className="col-span-2 space-y-6">
          <ProfileCard user={user} />

          <div className="border-mint/20 flex justify-around gap-4 border p-4 text-base">
            <div>
              <div>Followers:</div>
              <div className="text-2xl font-bold">{user.followers.length}</div>
            </div>
            <div>
              <div>Followings:</div>
              <div className="text-2xl font-bold">{user.following.length}</div>
            </div>
            <div>
              <div>Likes Collected:</div>
            </div>
          </div>
        </div>

        <ProfileTab user={user} currentUser={user} hasFollowed={false} />
      </div>
    </div>
  )
}

export default UserPage

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  })
  return {
    paths: users.map((user) => ({
      params: {
        '@username': user.username!,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { props: {} }
  }
  const rawUsername = Object.values(params)[0] as string
  const username = rawUsername.replace(/[!@#$%^&*]/g, '')
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      image: true,
      bio: true,
      createdAt: true,
      profile: true,
      following: {
        select: {
          follower: { select: { username: true, id: true, bio: true } },
          following: { select: { username: true, id: true, bio: true } },
        },
      },
      followers: {
        select: {
          follower: { select: { username: true, id: true, bio: true } },
          following: { select: { username: true, id: true, bio: true } },
        },
      },
    },
  })
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: { ...user, createdAt: user.createdAt.toISOString() },
    },
  }
}
