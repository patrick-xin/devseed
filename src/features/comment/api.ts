export const submitComment = async ({
  id,
  content,
}: {
  id: string
  content: string
}) => {
  const data = await fetch(`/api/m/${id}/comment`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      id,
    }),
  })
  return data.json()
}
