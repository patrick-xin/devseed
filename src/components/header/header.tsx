import { useUser } from '@/lib/hooks'

import Link from 'next/link'

import { ButtonLink, ProfileButton } from '..'
import SearchInput from './SearchInput'

const Header = () => {
  const { session } = useUser()

  return (
    <header>
      <nav className="mx-auto h-24 w-full">
        <ul className="bg-blue/10 mx-auto flex h-full max-w-6xl items-center">
          <li className="flex-1">
            <Link href="/">
              <a>devShare</a>
            </Link>
          </li>

          <li className="mx-4">
            <SearchInput />
          </li>
          <li className="mx-4">
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
