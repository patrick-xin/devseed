import { FiTrendingUp } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io'
import { FaSeedling } from 'react-icons/fa'
import { ButtonLink, IconButton } from '../buttons'
import { useRouter } from 'next/router'
import { useMarkFormModalStore } from '@/lib/store/modal'

const DashboardNavs = () => {
  const { asPath } = useRouter()
  const { openModal } = useMarkFormModalStore()

  return (
    <div className="sticky top-0 flex h-screen">
      <ul className="flex h-1/4 flex-col space-y-4 text-sm lg:mt-24">
        <li className="flex items-center justify-center">
          <IconButton
            onClick={() => openModal({ type: 'create' })}
            className="rounded-full border border-white/10 p-1"
          >
            <IoMdAdd className="h-4 w-4 text-purple-500" />
          </IconButton>
        </li>
        <li>
          <ButtonLink
            className="relative inline-flex w-full items-center rounded-sm rounded-b-sm border-b border-white/10 transition-colors ease-linear hover:bg-gray-100 dark:hover:bg-primary"
            href="/dashboard"
          >
            <FaSeedling className="mr-6 text-green-500" />
            {asPath.endsWith('dashboard') && (
              <div className="absolute -left-5 bottom-1/3 h-3 w-3 rounded-full bg-green-500 green-glow"></div>
            )}
            My Seeds
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            className="relative inline-flex w-full items-center rounded-sm rounded-b-sm border-b border-white/10 transition-colors ease-linear hover:bg-gray-100 dark:hover:bg-primary"
            href="/dashboard/collection"
          >
            {asPath.endsWith('collection') && (
              <div className="absolute -left-5 bottom-1/3 h-3 w-3 rounded-full bg-yellow-500 yellow-glow"></div>
            )}
            <FiTrendingUp className="-ml-1 mr-6 text-yellow-500" />
            My Collection
          </ButtonLink>
        </li>
      </ul>
    </div>
  )
}

export default DashboardNavs
