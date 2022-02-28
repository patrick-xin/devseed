import { useMutation, useQueryClient } from 'react-query'
import { submitComment } from './api'

export const useSubmitComment = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    ({ id, content }: { id: string; content: string }) =>
      submitComment({ id, content }),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['mark', id])
      },
    }
  )
  return { submitComment: mutate, isSubmitting: isLoading }
}
