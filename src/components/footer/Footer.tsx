import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
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
