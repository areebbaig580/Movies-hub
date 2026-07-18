import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const SearchPage = ({ setShowId }) => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('q');
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
            const response = await fetch(URL);
            const data = await response.json();
            const resultLen = data.results.length;
            console.log(data);
            let movieData = [];
            for (let i = 0; i < resultLen; i++) {
                let card = {};
                let title = data.results[i].title;
                let posterPath = data.results[i].poster_path;
                if (posterPath === null || posterPath === undefined) continue;
                let poster = `${posterUrl}${posterPath}`
                let id = data.results[i].id;

                card = { name: title, poster: poster, id: id };
                movieData.push(card);
            }
            setMovies(movieData);
        }
        fetchData();
    }, [query])

    return (
        <div className='h-fit w-full flex flex-wrap py-4 bg-[#131313] md:gap-5 justify-center gap-3 px-1 md:px-2'>
            {movies.map((e, index) => (

                <div className='w-[130px] mb-2 md:w-[160px]' key={index}>
                    <img src={e.poster} alt="" className='h-[28vh] md:h-[34vh] w-full object-contain rounded-lg' />
                    <div className='bg-[#191919] rounded-b-lg min-h-[12vh] w-full pl-2 py-2'>
                        <div>{e.name}</div>
                        <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                            to={'/Show'}
                            onClick={() => {
                                setShowId(e.id);
                                localStorage.setItem('id', JSON.stringify(e.id));
                            }}
                        >Show more
                        </Link>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default SearchPage
