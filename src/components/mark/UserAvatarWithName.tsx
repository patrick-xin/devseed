import UserAvatar from '../UserAvatar'

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
    <div className="flex items-center gap-2">
      <div className={`${sizes[size]} font-semibold`}>{username}</div>
      <UserAvatar username={username} image={image} size={size} />
    </div>
  )
}

export default UserAvatarWithName
