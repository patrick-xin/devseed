import Image from 'next/image'

const UserAvatar = ({
  image,
  username,
}: {
  image: string
  username: string
}) => {
  return (
    <div className="relative h-6 w-6">
      <Image
        priority={false}
        src={image}
        layout="responsive"
        height={30}
        width={30}
        className="rounded-full"
        alt={`${username}-avatar`}
      />
    </div>
  )
}

export default UserAvatar
