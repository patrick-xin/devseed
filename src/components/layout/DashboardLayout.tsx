import React from 'react'
import AddFolderModal from '../dashboard/AddFolderModal'
import DashboardNavs from '../dashboard/DashboardNavs'

import Header from '../header/header'

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <Header />
      <DashboardNavs />
      <main className="relative mx-auto min-h-[calc(100vh-6rem)] px-6 md:mx-16 lg:pl-[16rem] lg:pt-12">
        {children}
      </main>
      <AddFolderModal />
    </div>
  )
}

export default DashboardLayout
