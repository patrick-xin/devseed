import { useUser } from '@/lib/hooks'

import DeleteConfirmModal from '@/components/mark/DeleteConfirmModal'

import DashboardLayout from '@/components/layout/DashboardLayout'
import PersonalBookmark from '@/components/mark/Personalmark'

import { GridContainer, Loading } from '@/components'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <Loading />
  return (
    <DashboardLayout>
      <section>
        <GridContainer>
          {user.marks.map((mark) => (
            <PersonalBookmark
              key={mark.id}
              title={mark.title}
              link={mark.url}
              note={mark.description}
              id={mark.id}
            />
          ))}
        </GridContainer>
      </section>

      <DeleteConfirmModal />
    </DashboardLayout>
  )
}

export default Dashboard
