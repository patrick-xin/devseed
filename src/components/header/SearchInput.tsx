import React from 'react'
import { SearchIcon } from '../icons'

const SearchInput = () => {
  return (
    <div className="w-full space-y-0.5">
      <div className="relative">
        <input
          id="icon-suffix"
          type="text"
          placeholder="Search Keyword"
          className="form-input"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}

export default SearchInput
