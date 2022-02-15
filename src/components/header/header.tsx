import { useUser } from '@/lib/hooks'

import Link from 'next/link'

import { ButtonLink } from '@/components/buttons'
import { ProfileButton } from '@/components'
import SearchInput from './SearchInput'

const Header = () => {
  const { session } = useUser()

  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto h-24 w-full max-w-4xl">
        <ul className="mx-auto flex h-full items-center">
          <li className="flex-1">
            <Link href="/">
              <a>devShare</a>
            </Link>
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
