import CommentBox from './CommentBox'
import CommentForm from './CommentForm'

import type { Comment } from '@/lib/types'

type CommentProps = {
  id: string

  comments: Comment[]
}

const CommentSection = ({ id, comments }: CommentProps) => {
  return (
    <div>
      <CommentForm id={id} />
      <div className="space-y-4">
        {comments.map(({ content, createdAt, id, user: { name, image } }) => (
          <CommentBox
            key={id}
            content={content}
            createdAt={createdAt}
            username={name}
            image={image}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
