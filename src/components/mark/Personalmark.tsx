import { Menu } from '@headlessui/react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { CgFileRemove } from 'react-icons/cg'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'

import { Button, IconButton } from '../buttons'
import { EditIcon } from '../icons'

import { useToggle } from '@/hooks'
import { useConfirmModalStore } from '@/lib/store/confirm-modal'
import { useMarkFormModalStore } from '@/lib/store/modal'
import { useMoveCollectionToFolder } from '@/lib/hooks'

import type { Folder } from '@/lib/types'

type PersonalBookmarkProps = {
  title: string
  note?: string
  link: string
  id: string
  folders?: Folder[]
  folderName?: string
  collectionId?: string
}

const PersonalBookmark = ({
  title,
  link,
  id,
  folders,
  collectionId,
  folderName,
}: PersonalBookmarkProps) => {
  const [show, setShow] = useToggle()
  const { openModal } = useConfirmModalStore()
  const { openModal: openFormModal } = useMarkFormModalStore()
  const { moveCollectionToFolder } = useMoveCollectionToFolder()

  return (
    <div className="relative">
      <Menu as="div" className="absolute top-2 right-2 inline-block">
        <Menu.Button className="z-100 rounded-lg bg-black/10 p-2 transition-colors ease-linear dark:bg-white/10 dark:hover:bg-white/20 dark:disabled:cursor-not-allowed dark:disabled:bg-white/10">
          <BiDotsVerticalRounded />
        </Menu.Button>

        <Menu.Items className="absolute right-0 z-140 mt-2 w-40 space-y-2 rounded-md bg-grey p-2">
          {collectionId && (
            <div className="relative w-full">
              <Menu.Item as="div" className="relative">
                {({ active }) => (
                  <Menu as="div">
                    <Menu.Button
                      as={Button}
                      size="xs"
                      className={`${active ? 'bg-white/10' : ''}`}
                    >
                      <CgFileRemove className="mx-4 text-cyan-500" />
                      <span>Move to</span>
                    </Menu.Button>

                    <Menu.Items className="absolute bottom-0 z-100 flex h-40 w-32 translate-y-16 translate-x-[10.5rem] flex-col overflow-y-auto rounded-md bg-primary p-2">
                      {folders &&
                        folders.length > 0 &&
                        folders.map((folder) => (
                          <Menu.Item as="div" key={folder.id}>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  moveCollectionToFolder({
                                    collectionId,
                                    folderId: folder.id,
                                  })
                                }
                                className={`${
                                  active ? 'bg-white/10' : ''
                                } w-full rounded-lg p-2 text-xs`}
                              >
                                {folder.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                    </Menu.Items>
                  </Menu>
                )}
              </Menu.Item>
            </div>
          )}
          <Menu.Item>
            {({ active }) => (
              <Button size="xs" className={`${active ? 'bg-white/10' : ''}`}>
                <FiEdit className="mx-4 text-yellow-500" />
                <span>Edit</span>
              </Button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Button
                onClick={setShow}
                size="xs"
                className={`${active ? 'bg-white/10' : ''}`}
              >
                <BiDetail className="mx-4 text-indigo-500" />
                <span>Details</span>
              </Button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Button size="xs" className={`${active ? 'bg-white/10' : ''}`}>
                <FiTrash className="mx-4 text-red-500" />
                <span>Delete</span>
              </Button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <div className="min-h-[8rem] w-full space-y-4 rounded-lg border p-4 dark:border-white/10">
        <div className="flex w-full">
          <div className="w-full space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold">{title}</h3>
            </div>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full cursor-pointer break-words text-sm underline"
              href={link}
            >
              {link}
            </a>
            {folderName && (
              <div className="flex items-center">
                <AiOutlineFolder className="mx-2 h-4 w-4 text-white/30" />
                <span className="ml-1 mr-2 text-white/20">{'/'}</span>
                <span className="text-white/50">{folderName}</span>
              </div>
            )}
          </div>
        </div>
        {show && (
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() =>
                openFormModal({
                  markId: id,
                  type: 'edit',
                })
              }
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() =>
                openModal({
                  title: 'Are you sure to delete this mark?',
                  markId: id,
                })
              }
            >
              <RiDeleteBin6Line className="text-red-500" />
            </IconButton>
          </div>
        )}

        {show && (
          <p className="text-sm font-light leading-loose tracking-wide dark:text-[#808080] lg:min-h-[8rem]">
            detail
          </p>
        )}
      </div>
    </div>
  )
}

export default PersonalBookmark
