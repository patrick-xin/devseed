import { Menu } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import { MdOutlineExplore } from 'react-icons/md'
import { FaSeedling } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

import { UserAvatar } from '@/user/components/'
import { Button, ButtonLink } from '@/components'

import { useUser } from '@/user/hooks'
import { useMarkFormModalStore } from '@/lib/store/modal'

const ProfileButton = () => {
  const { user } = useUser()
  const { setTheme, theme } = useTheme()
  const { openModal } = useMarkFormModalStore()

  return (
    <div>
      <Menu as="div" className="relative z-100">
        <Menu.Button className="justify-center rounded-full text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-opacity-75">
          {user && (
            <UserAvatar size="md" username={user.name} image={user.image} />
          )}
        </Menu.Button>

        <div>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border border-white/10 bg-gray-50 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary lg:-right-24 lg:w-60">
            <div className="py-2 text-center font-semibold">
              Hi, <span className="italic">{user?.name}</span>
            </div>
            <div className="flex flex-col gap-1.5 px-1 py-1 text-center text-sm">
              <Menu.Item>
                {({ active }) => (
                  <ButtonLink
                    href="/mark"
                    className="inline-flex w-full items-center border border-black/10 bg-gray-50 dark:border-white/10 dark:bg-primary dark:hover:bg-white/10"
                  >
                    <MdOutlineExplore
                      className={cn('mr-7 h-6 w-6', {
                        'text-purple-500': active,
                      })}
                    />
                    <span>Explore</span>
                  </ButtonLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                    size="sm"
                    onClick={() => openModal({ type: 'create' })}
                  >
                    <FaSeedling
                      className={cn('mr-8 h-5 w-5', {
                        'text-green-500': active,
                      })}
                    />
                    <span className="inline-block text-sm">Create</span>
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
                      <span className="text-sm">Set light mode</span>
                    </Button>
                  ) : (
                    <Button onClick={() => setTheme('dark')}>
                      <BsMoonFill
                        className={cn('mr-8 h-5 w-5', {
                          'text-blue-500': active,
                        })}
                      />
                      <span className="text-sm">Set dark mode</span>
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
                    <span className="text-sm">Logout</span>
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
