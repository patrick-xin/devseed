import { LoadingIcon } from './icons'

const Loading = () => {
  return (
    <div className="absolute inset-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-white/10">
      <div className="flex gap-2">
        <LoadingIcon />
        <span>loading...</span>
      </div>
    </div>
  )
}

export default Loading
