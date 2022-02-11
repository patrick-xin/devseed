import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

const DetailPage = () => {
  const { query } = useRouter()
  const id = query.id
  const { data } = useSWR(id ? `/api/mark/${id}` : null)

  return <div>hi</div>
}

export default DetailPage
