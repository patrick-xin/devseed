import DashboardLayout from '@/components/layout/DashboardLayout'
import PersonalBookmark from '@/components/mark/Personalmark'
import { useUser } from '@/lib/hooks'
import React from 'react'

const DashboardCollection = () => {
  const { user } = useUser()
  return (
    <DashboardLayout>
      <h1 className="pb-4 lg:pb-12 lg:text-4xl">Marks I&apos;ve collected</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {user?.collection.length === 0
          ? "havn't collected"
          : user?.collection.map((c) => (
              <PersonalBookmark
                key={c.mark[0].id}
                title={c.mark[0].title}
                link={c.mark[0].url}
                note={c.mark[0].description}
                id={c.mark[0].id}
              />
            ))}
      </div>
    </DashboardLayout>
  )
}

export default DashboardCollection
