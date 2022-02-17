import { useToggle } from '@/hooks'
import { useConfirmModalStore } from '@/lib/store/confirm-modal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IconButton } from '../buttons'
import { EditIcon } from '../icons'

type PersonalBookmarkProps = {
  title: string
  note: string
  link: string
  id: string
}

const PersonalBookmark = ({ title, note, link, id }: PersonalBookmarkProps) => {
  const [show, setShow] = useToggle()
  const { openModal } = useConfirmModalStore()
  return (
    <div className="max-w-md">
      <div className="min-h-[15rem] w-full space-y-4 rounded-lg border p-4 dark:border-white/10 lg:p-6">
        <div className="flex w-full">
          <div className="w-full space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full cursor-pointer break-words text-sm underline"
              href={link}
            >
              {link}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton>
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
        <button
          onClick={() => {
            setShow()
          }}
        >
          {show ? 'hide description' : 'show description'}
        </button>

        {show && (
          <p className="min-h-[10rem] text-sm font-light leading-loose tracking-wide dark:text-[#808080] lg:min-h-[8rem]">
            {note}
          </p>
        )}
      </div>
    </div>
  )
}

export default PersonalBookmark
