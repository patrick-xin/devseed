import { useUser } from '@/lib/hooks'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ButtonLink } from '..'
import SearchInput from './SearchInput'
import { signOut } from 'next-auth/react'
const Header = () => {
  const { session } = useUser()
  const { setTheme } = useTheme()

  return (
    <header>
      <nav className="mx-auto h-24 w-full">
        <ul className="bg-blue/10 mx-auto flex h-full max-w-6xl items-center">
          <li className="flex-1">
            <Link href="/">
              <a>devShare</a>
            </Link>
          </li>
          <li>
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
          </li>
          <li className="mx-4">
            <ButtonLink href="/mark" className="bg-indigo-500">
              explore
            </ButtonLink>
          </li>
          <li className="mx-4">
            <ButtonLink href="/m/create" className="bg-purple-500">
              create
            </ButtonLink>
          </li>
          <li className="mx-4">
            <SearchInput />
          </li>
          <li className="mx-4">
            {session ? (
              <Link href={'/me'}>
                <a>
                  <div>
                    <Image
                      src={session.user?.image!}
                      layout="fixed"
                      height={40}
                      width={40}
                      className="rounded-full"
                      alt={session.user?.name!}
                    />
                    {session.user?.name}
                  </div>
                </a>
              </Link>
            ) : (
              <ButtonLink href="/login" className="bg-purple-500">
                login
              </ButtonLink>
            )}
          </li>
          <li>
            {session && <button onClick={() => signOut()}>logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
