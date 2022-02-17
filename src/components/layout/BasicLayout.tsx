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

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] grid-cols-[160px_1fr_120px] gap-10 px-6 md:mx-12 lg:pt-12">
        <NavTabs />
        <div>{children}</div>

        <SidebarRight />
        <Footer />
      </div>
    </>
  )
}

export default BasicLayout
