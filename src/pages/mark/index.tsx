import Bookmark, { BookMark } from '@/components/Bookmark'

import Header from '@/components/header/header'
import { useUser } from '@/lib/hooks'
import useSWR from 'swr'

// const getKey = (pageIndex, previousPageData) => {
//   if (previousPageData && !previousPageData.length) return null // reached the end
//   return `/api/m?page=${pageIndex}&limit=2` // SWR key
// }

export default function Home() {
  const { data: marks } = useSWR<BookMark>('/api/mark')
  const { user } = useUser()
  const userMarks = user?.marks.map((m) => m.id)

  if (!marks) return <div>loading...</div>
  return (
    <div>
      <Header />

      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
        {marks.map((mark) => (
          <Bookmark
            key={mark.id}
            bookmark={mark}
            isOwner={userMarks.includes(mark.id)}
          />
        ))}
      </div>
    </div>
  )
}
