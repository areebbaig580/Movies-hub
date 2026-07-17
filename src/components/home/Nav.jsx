import React from 'react'

const Nav = () => {
    return (
        <div className='h-fit w-full flex  pt-2 items-center gap-5'>
            <div className='text-lg font-bold text-black py-1 bg-amber-400 px-1 rounded-lg'>MovieHub</div>
            <div className=' flex  justify-between w-9/10 '>
                <div className='flex gap-5'>
                    <div className='text-sm md:text-md font-semibold '>Home</div>
                    <div className='text-sm md:text-md font-semibold'>Whishlist</div>
                    <div className='text-sm md:text-md font-semibold'>Genres</div>
                </div>
                <div className='flex gap-2 hidden md:block'>Search <input type="text" className='bg-white rounded-md text-black px-2 w-7/10' placeholder='Search' /></div>

            </div>
        </div>
    )
}

export default Nav
