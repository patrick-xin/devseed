import Bookmark from '@/components/Bookmark'
import BasicLayout from '@/components/layout/BasicLayout'
import { useToggle } from 'hooks/useToggle'
import { marks } from 'mock/data'
import React, { useState } from 'react'

const Dashboard = () => {
  return (
    <BasicLayout>
      <div>
        <h1>My Collections</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {marks.map((mark) => (
            <PersonalBookmark
              key={mark.id}
              title={mark.title}
              link={mark.link}
              note={mark.description}
              id={mark.id}
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
    <div>
      <div className="m-4 max-w-sm space-y-4 rounded-lg border p-4 dark:border-white/10 lg:p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold lg:text-2xl">{title}</h3>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block cursor-pointer underline"
            href={link}
          >
            {link}
          </a>
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
