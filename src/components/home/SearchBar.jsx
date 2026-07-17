import React from 'react'

const SearchBar = () => {
  return (
    <div className='py-2'>
      <input type="text" className='bg-bg-2 rounded-md text-white px-2 py-1 w-full block md:hidden my-2 outline-none' placeholder='Search' />
    </div>
  )
}

export default SearchBar
