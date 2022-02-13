import { EditIcon } from '@/components/icons'
import BasicLayout from '@/components/layout/BasicLayout'
import { useUser } from '@/lib/hooks'
import { useToggle } from '@/hooks'

const Dashboard = () => {
  const { user } = useUser()

  if (!user) return <div>loading...</div>
  return (
    <BasicLayout>
      <div>
        <div>
          <h1>Marks I&apos;ve created</h1>
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
                  key={c.mark.id}
                  title={c.mark.title}
                  link={c.mark.url}
                  note={c.mark.description}
                  id={c.mark.id}
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

const PersonalBookmark = ({ title, note, link, id }: PersonalBookmarkProps) => {
  const [show, setShow] = useToggle()
  return (
    <div className="max-w-md">
      <div className="w-full space-y-4 rounded-lg border bg-violet-600/10 p-4 dark:border-white/10 lg:p-6">
        <div className="flex w-full">
          <div className="w-full space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold">{title}</h3>
              <EditIcon id={id} />
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
