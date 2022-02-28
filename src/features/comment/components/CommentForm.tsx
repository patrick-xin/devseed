import { useSubmitComment } from '@/comment/hooks'
import { useForm } from 'react-hook-form'
import { IoIosSend } from 'react-icons/io'

import { Button } from '@/components/buttons'

type FormData = {
  content: string
}

type CommentFormProps = { id: string }

const CommentForm = ({ id }: CommentFormProps) => {
  const { register, handleSubmit, watch } = useForm<FormData>()

  const { submitComment, isSubmitting } = useSubmitComment()
  const onSubmit = async ({ content }: FormData) => {
    submitComment({ id, content })
  }
  const content = watch('content')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10 space-y-4">
      <textarea
        className="form-input min-h-[10rem]"
        {...register('content')}
        name="content"
        placeholder="Add A Comment"
      />
      <div className="flex w-full justify-end">
        <Button
          size="sm"
          type="submit"
          className="w-fit"
          disabled={content?.length === 0}
          isLoading={isSubmitting}
        >
          <IoIosSend />
          <span className="ml-2 inline-block text-sm">Submit</span>
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
