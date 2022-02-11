import { useUser } from '@/lib/hooks'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { ButtonLink } from '..'
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
              <div>
                <Image
                  src={session.user?.image!}
                  layout="fixed"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              </div>
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
