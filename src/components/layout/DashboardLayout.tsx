import React from 'react'
import DashboardNavs from '../dashboard/DashboardNavs'
import { Footer } from '../footer'
import Header from '../header/header'

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] grid-cols-[160px_1fr_120px] gap-10 px-6 md:mx-12 lg:pt-12">
        <DashboardNavs />
        <div>{children}</div>

        <Footer />
      </div>
    </>
  )
}

export default DashboardLayout
