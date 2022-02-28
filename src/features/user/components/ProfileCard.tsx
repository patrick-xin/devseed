import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { format, parseISO } from 'date-fns'
import { User } from '@/lib/types'

const ProfileCard = ({ user }: { user: User }) => {
  const { createdAt, profile } = user
  if (!profile)
    return (
      <div className="border-mint/20 space-y-4 border p-4">
        <div className="text-base">
          Joind: {format(parseISO(createdAt), 'MMM d, yyyy')}
        </div>
      </div>
    )
  return (
    <div className="border-mint/20 space-y-4 border p-4">
      <div className="flex gap-4">
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer">
            <BsGithub className="dark:hover:text-mint/70 h-6 w-6 transition-colors ease-linear" />
          </a>
        )}
        {profile.linkedIn && (
          <a href={profile.linkedIn} target="_blank" rel="noreferrer">
            <BsLinkedin className="dark:hover:text-mint/70 h-6 w-6 transition-colors ease-linear" />
          </a>
        )}
        {profile.facebook && (
          <a href={profile.facebook} target="_blank" rel="noreferrer">
            <BsFacebook className="dark:hover:text-mint/70 h-6 w-6 transition-colors ease-linear" />
          </a>
        )}
        {profile.twitter && (
          <a href={profile.twitter} target="_blank" rel="noreferrer">
            <BsTwitter className="dark:hover:text-mint/70 h-6 w-6 transition-colors ease-linear" />
          </a>
        )}
      </div>
      <div>
        {profile.website && (
          <a
            href={profile.twitter}
            className="decoration-mint text-sm hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {profile.website}
          </a>
        )}
      </div>
      {profile.about && <div>{profile.about}</div>}

      <div className="text-base">
        Joind: {format(parseISO(createdAt), 'MMM d, yyyy')}
      </div>
    </div>
  )
}

export default ProfileCard
