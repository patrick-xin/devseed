import Link from 'next/link'
import UserAvatar from './UserAvatar'

const UserAvatarWithName = ({
  username,
  image,
  size,
}: {
  username: string
  image: string
  size: 'sm' | 'md' | 'lg'
}) => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-lg',
  }
  return (
    <Link href={`/@${username}`}>
      <a className={`${sizes[size]} flex items-center gap-2 font-semibold`}>
        {username}
        <UserAvatar username={username} image={image} size={size} />
      </a>
    </Link>
  )
}

export default UserAvatarWithName
