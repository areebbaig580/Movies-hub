import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Bookmark from '../components/wishlist/Bookmark';

const SearchPage = ({ setShowId, bookmark, setBookmark , SearchType }) => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('q');
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/search/${SearchType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
            const genre = `https://api.themoviedb.org/3/discover/${SearchType}?api_key=${API_KEY}&with_genres=${28}`
            const genRes = await fetch(genre);
            const gendata = await genRes.json();
            // console.log(gendata);
            const response = await fetch(URL);
            const data = await response.json();
            const resultLen = data.results.length;
            // console.log(data);
            let movieData = [];
            for (let i = 0; i < resultLen; i++) {
                let title = '';
                let card = {};
                SearchPage === 'movie'? title = data.results[i].title: title = data.results[i].name;

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
        <div className='flex flex-col gap-2 bg-[#131313] px-1 md:px-2 py-2 min-h-[100vh]'>
            <div className='font-semibold text-md md:text-lg text-amber-300 ml-2'>Searching results for {query}</div>
            <div className='h-fit w-full flex flex-wrap md:gap-5 justify-center gap-3 '>
                {movies.map((e, index) => (

                    <div className='w-[100px] md:w-[160px] relative group' key={index} tabIndex={0}>
                        <Bookmark bookmark={bookmark} setBookmark={setBookmark} id={e.id} categ={SearchType} />
                        <img src={e.poster} alt="" className='h-[22vh] md:h-[34vh] w-full object-contain rounded-lg' />
                        <div className='bg-[#191919] rounded-b-lg min-h-[12vh] w-full pl-2 py-2'>
                            <div>{e.name}</div>
                            <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                                to={'/Show'}
                                onClick={() => {
                                    setShowId({ id: e.id, type: SearchType });
                                    localStorage.setItem('id', JSON.stringify({ id: e.id, type: SearchType }));
                                    localStorage.setItem('lastSearch', JSON.stringify({ id: e.id, name: e.name, type: SearchType }));
                                }}
                            >Show more
                            </Link>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default SearchPage
