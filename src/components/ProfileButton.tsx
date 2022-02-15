import { Menu } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import cn from 'classnames'
import { MdOutlineExplore } from 'react-icons/md'
import { FaSeedling } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

import UserAvatar from './UserAvatar'

import { useUser } from '@/lib/hooks'
import { useTheme } from 'next-themes'
import { Button, ButtonLink } from '@/components/buttons'
import { useMarkFormModalStore } from '@/lib/store/modal'

const ProfileButton = () => {
  const { session } = useUser()
  const { setTheme, theme } = useTheme()
  const { openModal } = useMarkFormModalStore()

  return (
    <div>
      <Menu as="div" className="relative z-100">
        <Menu.Button className="justify-center rounded-full border border-white/10 p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-opacity-75">
          {session && (
            <UserAvatar
              size="md"
              username={session.user!.name!}
              image={session.user!.image!}
            />
          )}
        </Menu.Button>

        <div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-white/10 bg-gray-50 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary lg:-right-24 lg:w-72">
            <div className="flex flex-col gap-1.5 px-1 py-1 text-center">
              <Menu.Item>
                {({ active }) => (
                  <ButtonLink
                    href="/mark"
                    className="inline-flex w-full items-center rounded-sm border border-white/10"
                  >
                    <MdOutlineExplore
                      className={cn('mr-9 -ml-1 h-7 w-7', {
                        'text-purple-500': active,
                      })}
                    />
                    <span>Explore</span>
                  </ButtonLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button onClick={() => openModal({ type: 'create' })}>
                    <FaSeedling
                      className={cn('mr-8 h-5 w-5', {
                        'text-green-500': active,
                      })}
                    />
                    <span>Create</span>
                  </Button>
                )}
              </Menu.Item>
            </div>
            <div className="flex flex-col gap-2 px-1 pt-4 pb-2 text-center">
              <Menu.Item>
                {({ active }) =>
                  theme === 'dark' ? (
                    <Button onClick={() => setTheme('light')}>
                      <BsSunFill
                        className={cn('mr-8 h-5 w-5', {
                          'text-yellow-500': active,
                        })}
                      />
                      <span>Set light mode</span>
                    </Button>
                  ) : (
                    <Button onClick={() => setTheme('dark')}>
                      <BsMoonFill
                        className={cn('mr-8 h-5 w-5', {
                          'text-blue-500': active,
                        })}
                      />
                      <span>Set dark mode</span>
                    </Button>
                  )
                }
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button onClick={() => signOut()}>
                    <BiLogOutCircle
                      className={cn('mr-8 -ml-1 h-6 w-6', {
                        'text-red-400': active,
                      })}
                    />
                    <span>Logout</span>
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
