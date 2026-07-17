import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

const Popular = () => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const imgUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

            const response = await fetch(URL);
            const data = await response.json();
            let topthree = [];

            for (let i = 0; i < 16; i++) {
                let card = {};
                let res = data.results[i].poster_path;
                let title = data.results[i].title;
                let poster = `${imgUrl}${res}`;
                let rating = data.results[i].vote_average.toFixed(1);
                card = { name: title, poster: poster , star: rating}
                topthree.push(card);

            }
            setMovies(topthree);
        };
        fetchData();
    }, [])
    console.log(movies);
    return (
        <>
            <div className='h-fit py-4 font-semibold text-md md:text-lg '>Popular Movies</div>
            <div className='h-fit w-full flex gap-5 overflow-x-auto overflow-y-hidden movie-row'>
                {movies.map((poster, index) =>
                    <div key={index} className='w-[128px] shrink-0 mb-2 md:w-[200px]'>
                        <img src={poster.poster} alt={poster.name} className='h-[20vh] md:h-[42vh] w-full object-contain rounded-lg' />
                        <div className='bg-[#262626] rounded-b-lg h-[12vh] md:h-[16vh] w-full pl-2 py-2'>
                            <div className='flex items-center gap-2'><Star size={18} className='text-amber-300'/> {poster.star}</div>
                            <div>{poster.name}</div>
                            <div className=' text-amber-300 text-sm cursor-pointer mt-2'>Show more</div>
                        </div>

                    </div>
                )}
            </div>
        </>
    )
}

export default Popular
