import { useUser } from '@/user/hooks'

import { DeleteConfirmModal } from '@/modal/components'

import { DashboardLayout } from '@/dashboard/components'
import { UserMark } from '@/user/components'

import { GridContainer, Loading } from '@/components'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <Loading />
  return (
    <DashboardLayout>
      <section>
        <GridContainer>
          {user.marks.map((mark, index) => (
            <UserMark
              key={mark.id}
              title={mark.title}
              link={mark.url}
              description={mark.description}
              id={mark.id}
              index={index + 1}
            />
          ))}
        </GridContainer>
      </section>

      <DeleteConfirmModal />
    </DashboardLayout>
  )
}

export default Dashboard
