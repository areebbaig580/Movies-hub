import React from 'react'

const Nav = () => {
    return (
        <div className='h-fit w-full flex px-6 pt-2 justify-between items-center'>
            <div className='text-xl font-bold text-black py-1 bg-white px-2 rounded-lg'>MovieHub</div>
            <div className='flex gap-4 '>
                <div className='text-md font-semibold'>Home</div>
                <div className='text-md font-semibold'>Whishlist</div>
            </div>
        </div>
    )
}

export default Nav
