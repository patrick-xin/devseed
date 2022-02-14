import { ChatIcon } from '@/components/icons'
import BasicLayout from '@/components/layout/BasicLayout'

import React from 'react'
import { ButtonLink } from '../components'

const HomePage = () => {
  return (
    <div>
      <BasicLayout>
        <>
          <div className="relative grid h-[calc(100vh-6rem)] grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
            <div className="col-start-1 space-y-4 lg:space-y-8">
              <h1 className="whitespace-pre-wrap pb-6 pt-6 text-5xl font-black leading-normal white-glow lg:pt-12 lg:text-6xl lg:leading-snug">
                Your{' '}
                <span className="text-purple-600/70 purple-glow">
                  companion
                </span>{' '}
                along with your{' '}
                <span className="text-yellow-500 underline decoration-purple-500 yellow-glow">
                  D
                </span>
                <span className="text-rose-500 underline decoration-purple-500 red-glow">
                  e
                </span>
                <span className="text-green-500 underline decoration-purple-500 green-glow">
                  v
                </span>{' '}
                journey
              </h1>
              <p className="lg:text-xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit,
                dolore! Consequatur ab nesciunt fugiat laboriosam mollitia ad
                cum voluptatem nostrum!
              </p>
              <ButtonLink href="/login" className="bg-purple-500">
                Get Started
              </ButtonLink>
            </div>

            {/* <div className="relative h-full w-full">
              <Image
                src="/assets/images/hero.svg"
                layout="fill"
                alt="hero"
                priority
              />
            </div> */}
            <div className="absolute bottom-20 right-24 h-8 w-72 bg-purple-500/10 md:right-6 md:bottom-20 lg:bottom-1/2"></div>
            <div className="absolute bottom-40 right-0 h-12 w-[30vw] bg-pink-500/5 md:right-1/2 md:bottom-32 lg:-right-20 lg:bottom-1/3"></div>
            <div className="absolute top-2/4 right-0 z-0 lg:top-1/4">
              <svg
                width="230"
                height="146"
                viewBox="0 0 230 146"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="fill-current text-white/10"
              >
                <path
                  fill="current"
                  d="M12 12h2v2h-2zM36 12h2v2h-2zM60 12h2v2h-2zM84 12h2v2h-2zM108 12h2v2h-2zM132 12h2v2h-2zM156 12h2v2h-2zM180 12h2v2h-2zM204 12h2v2h-2zM228 12h2v2h-2z"
                />
                <path
                  fill="current"
                  d="M12 36h2v2h-2zM36 36h2v2h-2zM60 36h2v2h-2zM84 36h2v2h-2zM108 36h2v2h-2zM132 36h2v2h-2zM156 36h2v2h-2zM180 36h2v2h-2zM204 36h2v2h-2zM228 36h2v2h-2z"
                />
                <path
                  fill="current"
                  d="M12 60h2v2h-2zM36 60h2v2h-2zM60 60h2v2h-2zM84 60h2v2h-2zM108 60h2v2h-2zM132 60h2v2h-2zM156 60h2v2h-2zM180 60h2v2h-2zM204 60h2v2h-2zM228 60h2v2h-2z"
                />
                <path
                  fill="current"
                  d="M12 84h2v2h-2zM36 84h2v2h-2zM60 84h2v2h-2zM84 84h2v2h-2zM108 84h2v2h-2zM132 84h2v2h-2zM156 84h2v2h-2zM180 84h2v2h-2zM204 84h2v2h-2zM228 84h2v2h-2z"
                />
                <path
                  fill="current"
                  d="M12 108h2v2h-2zM36 108h2v2h-2zM60 108h2v2h-2zM84 108h2v2h-2zM108 108h2v2h-2zM132 108h2v2h-2zM156 108h2v2h-2zM180 108h2v2h-2zM204 108h2v2h-2zM228 108h2v2h-2z"
                />
                <path
                  fill="current"
                  d="M12 132h2v2h-2zM36 132h2v2h-2zM60 132h2v2h-2zM84 132h2v2h-2zM108 132h2v2h-2zM132 132h2v2h-2zM156 132h2v2h-2zM180 132h2v2h-2zM204 132h2v2h-2zM228 132h2v2h-2z"
                />
              </svg>
            </div>
          </div>

          {/* Features */}
          <section className="">
            <h2 className="my-6 text-2xl lg:my-12 lg:text-4xl">Features</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <div className="flex items-center justify-around gap-4 rounded-md bg-white/5 px-4 py-5 md:flex-col md:gap-6 lg:gap-0 lg:space-y-10 lg:p-6">
                <div className="flex justify-center lg:w-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600/10 lg:h-24 lg:w-24">
                    <ChatIcon />
                  </div>
                </div>

                <p className="text-sm lg:text-base">
                  Get inspired by other devs. See recommend resources and
                  collect them.
                </p>
              </div>
              <div className="flex items-center rounded-md bg-white/5 px-4 py-5 md:flex-col md:gap-6 lg:space-y-10 lg:p-6">
                <div className="flex w-full justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/10 lg:h-24 lg:w-24">
                    <ChatIcon />
                  </div>
                </div>

                <p className="text-sm lg:text-base">
                  Hate bookmarks in the browser? We got you covered. With a
                  simple clicking, bookmark your resouces, all in one place!
                </p>
              </div>
              <div className="flex items-center rounded-md bg-white/5 px-4 py-5 md:flex-col md:gap-6 lg:space-y-10 lg:p-6">
                <div className="flex w-full justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10 lg:h-24 lg:w-24">
                    <ChatIcon />
                  </div>
                </div>

                <p className="text-sm lg:text-base">
                  Got something to share? No problem. Communicate through the
                  app. Share your knowlodge and expertise.
                </p>
              </div>
            </div>
          </section>
          {/* get started */}
          <section className="flex items-center lg:flex">
            <h2 className="my-6 text-2xl lg:my-12 lg:text-4xl">
              Ready to Get Started
            </h2>
            <ButtonLink
              href="/login"
              className="border border-purple-500 bg-transparent px-4 py-2"
            >
              Create
            </ButtonLink>
          </section>
        </>
      </BasicLayout>
    </div>
  )
}

export default HomePage
