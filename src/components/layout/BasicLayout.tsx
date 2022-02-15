import React from 'react'
import { Header } from '@/components/index'
import NavTabs from '../NavTabs'
import SidebarRight from '../sidebar/SidebarRight'

type BasicLayoutProps = {
  children: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <>
      <Header />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] grid-cols-[160px_1fr_120px] gap-10  px-6 md:px-12 lg:pt-12 xl:mx-24">
        <NavTabs />
        <div>{children}</div>

        <SidebarRight />
      </div>
    </>
  )
}

export default BasicLayout
