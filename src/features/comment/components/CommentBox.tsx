import { format } from 'date-fns'
import { UserAvatarWithName } from '@/user/components'

type CommentBoxProps = {
  username: string
  image: string
  content: string
  createdAt: string
}

const CommentBox = ({
  username,
  image,
  content,
  createdAt,
}: CommentBoxProps) => {
  return (
    <div className="rounded-md border border-white/10 p-4">
      <div className="mb-3 flex justify-between">
        <UserAvatarWithName size="sm" username={username} image={image} />
        <div className="text-sm text-white/20">
          commented at {format(new Date(createdAt), 'dd, LLL yyyy')}
        </div>
      </div>
      <p>{content}</p>
    </div>
  )
}

export default CommentBox
