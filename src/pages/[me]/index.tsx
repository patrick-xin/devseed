import { EditIcon } from '@/components/icons'
import BasicLayout from '@/components/layout/BasicLayout'
import { useUser } from '@/lib/hooks'
import { useToggle } from '@/hooks'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IconButton } from '@/components/buttons'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <div>loading...</div>
  return (
    <BasicLayout>
      <div>
        <div>
          <h1 className="pb-4 lg:text-4xl">Marks I&apos;ve created</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
            {user.marks.map((mark) => (
              <PersonalBookmark
                key={mark.id}
                title={mark.title}
                link={mark.url}
                note={mark.description}
                id={mark.id}
              />
            ))}
          </div>
        </div>
        <h1>Marks I&apos;ve collected</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {user.collection.length === 0
            ? "havn't collected"
            : user.collection.map((c) => (
                <PersonalBookmark
                  key={c.mark[0].id}
                  title={c.mark[0].title}
                  link={c.mark[0].url}
                  note={c.mark[0].description}
                  id={c.mark[0].id}
                />
              ))}
        </div>
      </div>
    </BasicLayout>
  )
}

export default Dashboard

type PersonalBookmarkProps = {
  title: string
  note: string
  link: string
  id: string
}

const PersonalBookmark = ({ title, note, link }: PersonalBookmarkProps) => {
  const [show, setShow] = useToggle()
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
          <EditIcon />
          <IconButton>
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
