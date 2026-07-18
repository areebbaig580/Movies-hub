import React from 'react'
import { Link } from 'react-router-dom'

const HeroPoster = ({ poster, setShowId }) => {
    return (
        <div className='h-fit w-fit relative rounded-lg overflow-hidden'>

            <img src={poster[0].poster} alt="" className='h-fit w-full object-contain md:h-[90vh] md:w-fit' />
            <div className='absolute bottom-0 left-0  pb-5 pl-6 md:pb-10 md:pl-8'>
                <div className='text-lg font-semibold mb-2 md:mb-4 md:text-4xl'>{poster[0].title}</div>
                <div className='flex gap-2 mb-2'>
                    {poster[0].genre.map((g, index) => (
                        <span key={index} className='px-2 py-1 bg-white/10 rounded-full text-xs md:text-sm'>
                            {g}
                        </span>
                    ))}
                </div>
                <div className='w-7/10 mb-3 hidden md:block md:text-lg'>{poster[0].overview}</div>
                <div className='text-white/65 text-xs md:text-md'>{poster[0].release}</div>
            </div>
            <div className='absolute bottom-0 right-0 pb-6 md:pb-10 pr-6'>
                <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                    to={'/Show'}
                    onClick={() => {
                        setShowId(poster[0].id)
                        localStorage.setItem('id', JSON.stringify(poster[0].id));
                    }}
                >Show more</Link>
            </div>
        </div>
    )
}

export default HeroPoster
