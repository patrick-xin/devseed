import { useUser } from '@/lib/hooks'

import DeleteConfirmModal from '@/components/mark/DeleteConfirmModal'

import DashboardLayout from '@/components/layout/DashboardLayout'
import PersonalBookmark from '@/components/mark/Personalmark'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <div>loading...</div>
  return (
    <DashboardLayout>
      <div>
        <section>
          <h1 className="pb-4 lg:text-4xl">Marks I&apos;ve created</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
            {user.marks.map((mark) => (
              <PersonalBookmark
                key={mark.id}
                title={mark.title}
                link={mark.url}
                note={mark.description}
                id={mark.id}
              />
            ))}
          </div>
        </section>

        <DeleteConfirmModal />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
