import React from 'react'
import { Link } from 'react-router-dom'

const HeroComponent = ({ movies }) => {
    console.log(movies)
    return (

        movies.map((movie, index) => (
            <div className='h-fit md:h-[42vh] w-full flex  items-center' key={index}>

                <img src={movie.img} alt="" className=' w-fit object-contain rounded-lg h-[20vh] md:h-full' />
                <div className='h-fit w-full  px-2 py-2 md:h-full'>
                    <div className='text-md md:text-xl font-semibold mb-2'>{movie.title}</div>
                    <div className='flex h-fit flex-wrap gap-2 mb-1'>
                        {movie.genre.map((g, index) => (
                            <span key={index} className=' text-white/65 rounded-full text-xs md:text-sm'>
                                {g}
                            </span>
                        ))}

                    </div>
                    <div className='text-xs'>{movie.overview}</div>
                    <div className='mt-2 '>
                        <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                            to={'/Show'}
                            onClick={() => { setShowId(movie.id) }}
                        >Show more</Link>

                    </div>
                </div>
            </div>
        ))

    )
}

export default HeroComponent
