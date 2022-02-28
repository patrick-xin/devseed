import { useFollow, useUnfollow, useUser } from '@/user/hooks'

import { useMemo } from 'react'
import Link from 'next/link'
import { User } from '@/lib/types'
import { Button, RequireLogin } from '@/components'

type FollowCardProps = {
  username: string
  bio?: string
  userId: string
  currentUser: User
  hasFollowed: boolean
}

const FollowCard = ({ username, bio, userId }: FollowCardProps) => {
  const { user } = useUser()
  const hasFollowed = useMemo(() => {
    return user?.following
      .map((following) => following.follower.username)
      .includes(username)
  }, [username])
  console.log(hasFollowed)

  const { follow, isFollowLoading } = useFollow({
    userId: userId,
    username: username,
  })

  const { unfollow, isUnfollowLoading } = useUnfollow({
    userId: userId,
    username: username,
  })
  return (
    <div className="border-mint/20 flex h-72  w-72 flex-col items-center justify-center rounded-lg border p-6">
      <Link href={`/@${username}`}>
        <a>{username}</a>
      </Link>{' '}
      <div></div>
      {bio && <p>{bio}</p>}
      <RequireLogin
        text="login to follow"
        functionChildren={() =>
          hasFollowed ? (
            <Button
              disabled={isUnfollowLoading}
              title="unfollow"
              type="button"
              isLoading={isUnfollowLoading}
              onClick={() => unfollow()}
            >
              unfollow
            </Button>
          ) : (
            <Button
              disabled={isFollowLoading}
              title="follow"
              type="button"
              isLoading={isFollowLoading}
              onClick={() => follow()}
            >
              follow
            </Button>
          )
        }
      />
    </div>
  )
}

export default FollowCard
