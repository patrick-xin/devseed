import { useRouter } from 'next/router'
import React from 'react'

const CategoryPage = () => {
  const { query } = useRouter()
  return <div>{query.slug}</div>
}

export default CategoryPage
