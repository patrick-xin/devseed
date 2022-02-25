import { usePopularTags } from '@/lib/hooks'
import React from 'react'
import { Badge } from '../mark'

const SidebarRight = () => {
  const { populatTags, isLoadingPopularTags } = usePopularTags()
  if (isLoadingPopularTags) return null
  return (
    <aside className="lg:top-120 h-screen lg:sticky lg:inset-0">
      <div className="mt-[10vh] h-1/4 w-full">
        <h2 className="text-lg font-bold">Popular tags</h2>
        <div className="mt-2 flex flex-col gap-4">
          {populatTags?.map((tag, index) => (
            <Badge key={index} name={tag.name} size="sm" />
          ))}
        </div>
      </div>
    </aside>
  )
}

export default SidebarRight
