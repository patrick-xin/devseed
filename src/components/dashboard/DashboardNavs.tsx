import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react'
import { VscExpandAll } from 'react-icons/vsc'
import { AiOutlineFolder } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { FaSeedling } from 'react-icons/fa'
import { FiChevronUp } from 'react-icons/fi'
import { BiCollection } from 'react-icons/bi'

import { Button, ButtonLink } from '../buttons'

import { useMarkFormModalStore } from '@/lib/store/modal'
import { useAddFolderModalStore } from '@/lib/store/add-folder-modal'
import { useUserFolders } from '@/lib/hooks'

const DashboardNavs = () => {
  const { openModal } = useMarkFormModalStore()
  const { openModal: OpenCreateModal } = useAddFolderModalStore()
  const { userFolders } = useUserFolders()
  const { asPath } = useRouter()

  return (
    <aside className="fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[16rem] overflow-y-auto pb-10 lg:block">
      <nav>
        <ul className="flex w-full flex-col text-sm lg:my-24">
          <li>
            <Button
              variant="naked"
              size="sm"
              onClick={() => openModal({ type: 'create' })}
              className="nav-link"
            >
              <IoMdAdd className="mx-6 h-4 w-4 text-purple-500" />
              <span>Create Seed</span>
            </Button>
          </li>
          <li>
            <ButtonLink className="nav-link" href="/dashboard">
              <FaSeedling className="mx-6 text-green-500" />
              <span>My Seed</span>
              {asPath.endsWith('dashboard') && (
                <div className="mx-8 h-2 w-2 rounded-full bg-green-500 green-glow" />
              )}
            </ButtonLink>
          </li>

          <Disclosure as="li">
            {({ open }) => (
              <>
                <Disclosure.Button className="nav-link">
                  <BiCollection className="mx-6 text-yellow-500" />
                  <span>My Collection</span>
                  <FiChevronUp
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } ml-2 h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
                  <Button
                    onClick={() => OpenCreateModal()}
                    className="nav-link"
                    variant="naked"
                    size="sm"
                  >
                    <IoMdAdd className="mx-2 ml-10 h-4 w-4 text-purple-500" />
                    add new
                  </Button>
                  <ButtonLink className="nav-link" href="/dashboard/collection">
                    <VscExpandAll className="mx-2 ml-9 h-4 w-4 text-blue-500" />
                    <span>All</span>
                    {asPath.endsWith('collection') && (
                      <div className="mx-8 h-2 w-2 rounded-full bg-green-500 green-glow" />
                    )}
                  </ButtonLink>

                  {userFolders?.map((folder) => (
                    <Disclosure.Button
                      as={Link}
                      href={`/dashboard/collection/${folder.id}`}
                      key={folder.id}
                    >
                      <a className="nav-link p-2">
                        <AiOutlineFolder className="mx-4 ml-10 h-4 w-4 text-white/20" />
                        {folder.name}
                        {asPath.endsWith(folder.id) && (
                          <div className="mx-8 h-2 w-2 rounded-full bg-green-500 green-glow" />
                        )}
                      </a>
                    </Disclosure.Button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </ul>
      </nav>
    </aside>
  )
}

export default DashboardNavs
