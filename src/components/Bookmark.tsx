import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '.'
import IconButton from './IconButton'
import { format } from 'date-fns'
import {
  ChatIcon,
  DownVoteIcon,
  EditIcon,
  HeartIcon,
  HeartSolidIcon,
  UpVoteIcon,
} from './icons'
import { capLetter } from 'uitls'
import { Mark } from '@/lib/types'
import { useLikeMark } from '@/lib/hooks'

type BookmarkProps = {
  bookmark: Mark
  isOwner: boolean | undefined
  hasLiked: boolean | undefined
}

const Bookmark = ({ bookmark, isOwner, hasLiked }: BookmarkProps) => {
  const { title, author, tags, url, description, type, _count, id, createdAt } =
    bookmark

  const { likeMark } = useLikeMark()
  const renderLikeIcon = () => {
    if (!isOwner && !hasLiked)
      return (
        <IconButton onClick={() => likeMark(id)}>
          <HeartIcon />
        </IconButton>
      )

    if (!isOwner && hasLiked)
      return (
        <IconButton>
          <HeartSolidIcon />
        </IconButton>
      )
    return null
  }
  console.log(_count)

  return (
    <div className="m-4 flex max-w-xl flex-col justify-between space-y-6 rounded-lg border p-4 dark:border-white/10 lg:p-6">
      <header>
        <div className="mb-2 flex items-center justify-between">
          <Link href={`/mark/${id}`}>
            <a>
              <h3 className="text-xl font-bold lg:text-2xl">{title}</h3>
            </a>
          </Link>
          {renderLikeIcon()}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <ChatIcon />
            <span className="text-xs">{_count.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <HeartSolidIcon />
            <span className="text-xs">{_count.likes}</span>
          </div>
        </div>
      </header>

      <div className="flex-grow space-y-3">
        <div className="flex items-center">
          <SubHeading title="Created by" />

          <UserAvatarWithName username={author.name} image={author.image} />
        </div>
        <div className="mb-2 flex items-center text-xs">
          <SubHeading title="Created At" />
          <div>{format(new Date(createdAt), 'dd, LLL yyyy')}</div>
        </div>
        <div className="mb-2 flex">
          <SubHeading title="Tags" />
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Badge name={tag.name} key={tag.name} />
            ))}
          </div>
        </div>
        <div className="mb-2 flex items-center text-xs">
          <SubHeading title="Category" />
          <div>{capLetter(type)}</div>
        </div>
        <div>
          <SubHeading title="Link" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-w-full cursor-pointer break-words underline"
          >
            {url}
          </a>
        </div>
        <div className="flex  flex-col justify-between">
          <p className="min-h-[10rem] break-words text-sm font-light leading-loose tracking-wide dark:text-[#808080] lg:min-h-[8rem]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between pt-4">
        <div>
          <UpvoteDownVote />
        </div>
        {isOwner && <EditIcon id={id} />}
      </div>
    </div>
  )
}

export default Bookmark

const UpvoteDownVote = () => {
  return (
    <div className="flex gap-2 lg:gap-4">
      <UpVoteIcon />
      <DownVoteIcon />
    </div>
  )
}

export const UserAvatarWithName = ({
  username,
  image,
}: {
  username: string
  image: string
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs font-semibold">{username}</div>
      <div className="relative h-6 w-6">
        <Image
          src={image}
          layout="responsive"
          height={30}
          width={30}
          className="rounded-full"
          alt={`${username}-avatar`}
        />
      </div>
    </div>
  )
}

export const SubHeading = ({
  title,
  hasMargin = true,
}: {
  title: string
  hasMargin?: boolean
}) => {
  return (
    <div
      className={`${
        hasMargin ? 'mr-8' : 'm-0'
      }  text-xs text-gray-500 dark:text-[#5b5b5b]`}
    >
      {title}
    </div>
  )
}
