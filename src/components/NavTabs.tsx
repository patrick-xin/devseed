import { FiTrendingUp } from 'react-icons/fi'
import { FaSeedling } from 'react-icons/fa'
import { RiUserStarLine } from 'react-icons/ri'
import { ButtonLink } from './buttons'

const NavTabs = () => {
  return (
    <div className="sticky top-0 flex h-screen">
      <ul className="flex h-1/4 flex-col space-y-4 lg:mt-24">
        <li>
          <ButtonLink
            className="inline-flex w-full items-center rounded rounded-b-sm border-b border-white/10 transition-colors ease-linear hover:bg-gray-100 dark:hover:bg-primary"
            href="/me"
          >
            <FaSeedling className="mr-6 text-green-500" />
            My Seeds
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            className="inline-flex w-full items-center rounded rounded-b-sm border-b border-white/10 transition-colors ease-linear hover:bg-gray-100 dark:hover:bg-primary"
            href="/me"
          >
            <FiTrendingUp className="-ml-1 mr-6 text-yellow-500" />
            Trending
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            className="inline-flex w-full items-center rounded rounded-b-sm border-b border-white/10 transition-colors ease-linear hover:bg-gray-100 dark:hover:bg-primary"
            href="/me"
          >
            <RiUserStarLine className="-ml-2 mr-6 text-purple-500" />
            Top Seeders
          </ButtonLink>
        </li>
      </ul>
    </div>
  )
}

export default NavTabs
