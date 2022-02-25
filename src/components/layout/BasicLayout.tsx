import React from 'react'
import { Header } from '@/components/index'
import NavTabs from '../NavTabs'
import SidebarRight from '../sidebar/SidebarRight'
import { Footer } from '../footer'

type BasicLayoutProps = {
  children: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <>
      <Header />

      <div className="gird-cols-1 relative mx-auto grid min-h-[calc(100vh-6rem)] gap-10 px-6 md:mx-12 lg:grid-cols-[160px_1fr_120px] lg:pt-12">
        <NavTabs />
        <div>{children}</div>

        <SidebarRight />
        <Footer />
      </div>
    </>
  )
}

export default BasicLayout
