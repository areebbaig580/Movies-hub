import React, { useEffect, useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom';
import Bookmark from '../wishlist/Bookmark';


const Popular = ({ url, label, setShowId, query , categ }) => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const imgUrl = 'https://image.tmdb.org/t/p/original';

    const [bookmark, setBookmark] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('bookmark'));
        return saved ? saved : [];
    });
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `${url}${API_KEY}${query}`;
            const response = await fetch(URL);
            const data = await response.json();
            let details = [];
            // console.log(data);

            let len = data.results.length;

            for (let i = 0; i < len; i++) {
                let title = '';
                let card = {};

                let res = data.results[i].poster_path;
                if (categ === 'tv') {
                    title = data.results[i].name;
                } else {
                    title = data.results[i].title;
                }
                let poster = `${imgUrl}${res}`;
                let rating = data.results[i].vote_average.toFixed(1);
                let ident = data.results[i].id;
                let type = data.results[i].media_type || 'movie';
                

                card = { name: title, poster: poster, star: rating, id: ident , type: type}
                details.push(card);

            }
            setMovies(details);
        };
        fetchData();
    }, [url])
    // console.log(movies);

    return (
        <>
            <div className='h-fit py-4 font-semibold text-md md:text-lg text-amber-300'>{label}</div>
            <div className='h-fit w-full flex gap-5 overflow-x-auto overflow-y-hidden movie-row'>
                {movies.map((movie, index) => (

                    <div key={index} className='w-[130px] md:w-[160px] shrink-0  relative group' tabIndex={0}>

                        <Bookmark bookmark={bookmark} setBookmark={setBookmark} id={movie.id} />

                        <img src={movie.poster} alt={movie.name} className='h-[28vh] md:h-[34vh] w-full object-contain rounded-lg' />

                        <div className='bg-[#191919] rounded-b-lg min-h-[12vh] h-fit w-full pl-2 py-2'>

                            <div className='flex items-center gap-2 text-sm'><Star size={18} className='text-amber-300' /> {movie.star}</div>
                            <div>{movie.name}</div>

                            <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                                to={'/Show'}
                                onClick={() => {
                                    setShowId({id: movie.id, type: movie.type});
                                    localStorage.setItem('id', JSON.stringify({id: movie.id, type: movie.type}));
                                    localStorage.setItem('lastSearch', JSON.stringify({ id: movie.id, name: movie.name , type : movie.type}));
                                }}
                            >Show more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Popular
