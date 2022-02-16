const MarkLoader = () => {
  return (
    <div className="min-h-[26rem] w-full max-w-sm rounded-md border border-white/10 px-4 py-6 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 w-3/4 rounded bg-white/10"></div>
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-white/10"></div>
            <div className="h-4 w-1/3 rounded bg-white/10"></div>
            <div className="h-4 w-1/4 rounded bg-white/10"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-white/10"></div>
            <div className="h-4 w-full rounded bg-white/10"></div>
            <div className="h-4 w-full rounded bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkLoader
