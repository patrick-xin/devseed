import Image from 'next/image'

const UserAvatar = ({
  image,
  username,
  size,
}: {
  image: string
  username: string
  size: 'sm' | 'md' | 'lg'
}) => {
  return (
    <div className="relative">
      <Image
        priority={false}
        src={image}
        layout="fixed"
        height={size === 'sm' ? 30 : size === 'md' ? 45 : 60}
        width={size === 'sm' ? 30 : size === 'md' ? 45 : 60}
        className="rounded-full"
        alt={`${username}-avatar`}
      />
    </div>
  )
}

export default UserAvatar
