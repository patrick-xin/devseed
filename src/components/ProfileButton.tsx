import { Menu } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import cn from 'classnames'

import ButtonLink from './ButtonLink'
import UserAvatar from './UserAvatar'

import { useUser } from '@/lib/hooks'
import { useTheme } from 'next-themes'
import { Button } from '.'
import { useMarkFormModalStore } from '@/lib/store/modal'

const ProfileButton = () => {
  const { session } = useUser()
  const { setTheme } = useTheme()
  const { openModal } = useMarkFormModalStore()

  return (
    <div className="w-56">
      <Menu as="div" className="relative z-100 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-black/10 ">
            {session && (
              <UserAvatar
                username={session.user!.name!}
                image={session.user!.image!}
              />
            )}
          </Menu.Button>
        </div>
        <div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-white/10 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary">
            <div className="flex flex-col gap-1.5 px-1 py-1 text-center">
              <Menu.Item>
                {({ active }) => (
                  <ButtonLink
                    href="/mark"
                    className={cn('w-full rounded-sm border border-white/10', {
                      'bg-white/10': active,
                    })}
                  >
                    explore
                  </ButtonLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={cn('w-full rounded-sm border border-white/10', {
                      'bg-white/10': active,
                    })}
                    onClick={() => openModal({ type: 'create' })}
                  >
                    create
                  </Button>
                )}
              </Menu.Item>
            </div>
            <div className="flex flex-col gap-2 px-1 py-1 text-center">
              <Menu.Item>
                <>
                  <button onClick={() => setTheme('light')}>Light</button>
                  <button onClick={() => setTheme('dark')}>Dark</button>
                </>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                    className={cn('w-full rounded-sm border border-white/10', {
                      'bg-white/10': active,
                    })}
                    onClick={() => signOut()}
                  >
                    logout
                  </Button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      </Menu>
    </div>
  )
}

export default ProfileButton
