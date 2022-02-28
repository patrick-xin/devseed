import { Fragment } from 'react'
import classNames from 'classnames'
import { Tab } from '@headlessui/react'
import { User } from '@/lib/types'
import FollowCard from './FollowCard'

const TABS = [
  {
    title: 'Seeds',
  },
  { title: 'Followers' },
  {
    title: 'Followings',
  },
]

type ProfileTabProps = {
  user: User
  currentUser: User
  hasFollowed: boolean
}

const ProfileTab = ({ user, currentUser, hasFollowed }: ProfileTabProps) => {
  return (
    <div className="col-span-full col-start-3 mx-auto w-full sm:px-0">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="bg-lead flex space-x-1 rounded-xl p-1">
          {TABS.map((tab, index) => (
            <Tab as={Fragment} key={index}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'w-full rounded-md py-1.5 text-base font-medium text-white',
                    'ring-white/20 transition-colors ease-linear focus:outline-none focus:ring-1',
                    {
                      'bg-white dark:bg-white/20': selected,
                      ' bg-gray-100 dark:bg-white/10': !selected,
                    }
                  )}
                >
                  {tab.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="px-4">
            <div className="py-8">
              <div className="space-y-4 text-sm">
                {user.followers.length === 0 ? (
                  <p className="text-lg">0 follower</p>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      {user.followers
                        .filter((f) => f.following.id !== currentUser?.id)
                        .map((f) => (
                          <FollowCard
                            key={f.following.id}
                            currentUser={currentUser}
                            bio={f.following.bio}
                            hasFollowed={hasFollowed}
                            userId={f.following.id}
                            username={f.following.username}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="px-4">
            <div className="py-8">
              {user.following.length === 0 ? (
                <div>0 Following</div>
              ) : (
                <div className="flex gap-2">
                  {user.following
                    .filter((f) => f.follower.id !== currentUser?.id)
                    .map((f) => (
                      <FollowCard
                        key={f.follower.id}
                        currentUser={currentUser}
                        bio={f.follower.bio}
                        hasFollowed={hasFollowed}
                        userId={f.follower.id}
                        username={f.follower.username}
                      />
                    ))}
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default ProfileTab
