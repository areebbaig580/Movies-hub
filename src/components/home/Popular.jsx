import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom';

const Popular = ({ url, label, setShowId }) => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const imgUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `${url}${API_KEY}`;
            const response = await fetch(URL);
            const data = await response.json();
            let details = [];

            // console.log(data.results);

            for (let i = 0; i < 20; i++) {
                let title = '';
                let card = {};

                let res = data.results[i].poster_path;
                if (label === 'Trending Series') {
                    title = data.results[i].name;
                } else {
                    title = data.results[i].title;
                }
                let poster = `${imgUrl}${res}`;
                let rating = data.results[i].vote_average.toFixed(1);
                let ident = data.results[i].id;

                card = { name: title, poster: poster, star: rating, id: ident }
                details.push(card);

            }
            setMovies(details);
        };
        fetchData();
    }, [])

    return (
        <>
            <div className='h-fit py-4 font-semibold text-md md:text-lg text-amber-300'>{label}</div>
            <div className='h-fit w-full flex gap-5 overflow-x-auto overflow-y-hidden movie-row mb-4'>
                {movies.map((movie, index) =>
                    <div key={index} className='w-[160px] shrink-0 mb-2 md:w-[200px]'>

                        <img src={movie.poster} alt={movie.name} className='h-[26vh] md:h-[42vh] w-full object-contain rounded-lg' />
                        <div className='bg-[#191919] rounded-b-lg h-[17vh] w-full pl-2 py-2'>

                            <div className='flex items-center gap-2 text-sm'><Star size={18} className='text-amber-300' /> {movie.star}</div>
                            <div>{movie.name}</div>
                            <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                                to={'/Show'}
                                onClick={() => { setShowId(movie.id);
                                    localStorage.setItem('id', JSON.stringify(movie.id));
                                 }}
                            >Show more</Link>

                        </div>

                    </div>
                )}
            </div>
        </>
    )
}

export default Popular
