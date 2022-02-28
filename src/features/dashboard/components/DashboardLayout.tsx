import { DashboardNavs } from '.'

import { AddFolderModal } from '@/modal/components'

import { Header } from '@/components'

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Header />
      <DashboardNavs />
      <main className="relative mx-auto flex min-h-[calc(100vh-6rem)] justify-center px-6 md:mx-16 lg:pl-[16rem] lg:pt-12">
        {children}
      </main>
      <AddFolderModal />
    </div>
  )
}

export default DashboardLayout
