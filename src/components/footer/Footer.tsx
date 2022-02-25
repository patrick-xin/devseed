import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="mt-[20vh] h-64 w-full border-t border-white/10">
      <ul>
        <li className="mx-4">
          <Link href="/about">
            <a>about</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
