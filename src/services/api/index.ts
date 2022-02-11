export const createMark = async ({
  title,
  markLink,
  description,
  category,
}: {
  title: string
  markLink: string
  description: string
  category: []
}) => {
  const data = await fetch('/api/m', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, markLink, description, category }),
  })
  return data.json()
}

export const updateMark = async ({
  title,
  url,
  description,
  id,
}: {
  title: string
  url: string
  description: string
  id: string
}) => {
  const data = await fetch(`/api/m/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, url, description }),
  })
  return data.json()
}

export const deleteMark = async (id: string) => {
  const data = await fetch(`/api/m/${id}`, {
    method: 'DELETE',
  })
  return data.json()
}

export const GetMark = async (id: string) => {
  const data = await fetch(`/api/mark/${id}`)
  return data.json()
}

export const GetMarks = async () => {
  const data = await fetch(`/api/mark`)
  return data.json()
}
