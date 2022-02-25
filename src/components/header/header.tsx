import { useUser } from '@/lib/hooks'

import Link from 'next/link'

import { ButtonLink } from '@/components/buttons'
import { ProfileButton } from '@/components'
import SearchInput from './SearchInput'

const Header = () => {
  const { session } = useUser()

  return (
    <header className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:z-50 lg:border-b lg:border-slate-900/10">
      <nav className="mx-auto h-24 w-full max-w-4xl">
        <ul className="mx-auto flex h-full items-center">
          <li className="flex-1">
            <Link href="/">
              <a>devShare</a>
            </Link>
          </li>
          <li>
            <ButtonLink
              size="md"
              href="/mark"
              className="inline-flex w-full items-center border border-black/10 dark:border-white/10 dark:bg-primary dark:hover:bg-white/10"
            >
              Explore
            </ButtonLink>
          </li>
          <li className="mx-4">
            <SearchInput />
          </li>
          <li className="mx-4 flex justify-end">
            {session ? (
              <ProfileButton />
            ) : (
              <ButtonLink href="/login" className="bg-purple-500">
                login
              </ButtonLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
