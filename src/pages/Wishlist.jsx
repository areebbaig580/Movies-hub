import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Wishlist = ({ setShowId }) => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [bookmark, removeBookmark] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('bookmark'));
        return saved ? saved : [];
    });
    const movieBook = bookmark.filter((b) => b.type === 'movie').map((c) => c.id);
    const tvBook = bookmark.filter((b) => b.type === 'tv').map((c) => c.id);
    useEffect(() => {
        const fetchData = async () => {

            const movie = await Promise.all(
                movieBook.map(b =>
                    fetch(`https://api.themoviedb.org/3/movie/${b}?api_key=${API_KEY}`)
                        .then(res => res.json())
                )
            );

            const movieData = movie.flatMap(m =>
                ({ name: m.title, poster: `${posterUrl}${m.poster_path}`, id: m.id })
            );

            const tv = await Promise.all(
                tvBook.map(b =>
                    fetch(`https://api.themoviedb.org/3/tv/${b}?api_key=${API_KEY}`)
                        .then(res => res.json())
                )
            );

            const tvData = tv.flatMap(m =>
                ({ name: m.name, poster: `${posterUrl}${m.poster_path}`, id: m.id })
            );

            setMovies(movieData);
            setLoading(false);
            setTv(tvData);
        }
        fetchData();
    }, [bookmark])
    if (loading) return (<div>Loading</div>)
    return (
        <div className='min-h-[100vh] w-fit px-1 md:px-2 flex gap-2 flex-col'>
            <div className='flex flex-col bg-[#131313] px-2 py-2 gap-2 min-h-[60vh] min-w-[100vw]'>

                <div className='h-fit font-semibold text-md md:text-lg text-amber-300'>Wishlist</div>

                <div className='h-fit w-full flex flex-wrap md:gap-5 gap-3 justify-center md:justify-start '>

                    {movies.map((e, index) => (

                        <div className='w-[100px] mb-2 md:w-[160px] relative group' key={index} tabIndex={0}>
                            <div className='absolute top-2 right-3 hidden group-focus:block md:group-hover:block cursor-pointer'
                                onClick={() => {
                                    let bookmarkDet = bookmark.filter((b) => b.id !== e.id);
                                    removeBookmark(bookmarkDet);
                                    localStorage.setItem('bookmark', JSON.stringify(bookmarkDet));
                                }}
                            ><Heart className='fill-red-500 text-red-500' size={24} /></div>
                            <img src={e.poster} alt="" className='h-[22vh] md:h-[34vh] w-full object-contain rounded-lg' />
                            <div className='bg-[#191919] rounded-b-lg min-h-[12vh] w-full pl-2 py-2'>
                                <div>{e.name}</div>
                                <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                                    to={'/Show'}
                                    onClick={() => {
                                        setShowId({ id: e.id, type: 'movie' });
                                        localStorage.setItem('id', JSON.stringify({ id: e.id, type: 'movie' }));
                                        localStorage.setItem('lastSearch', JSON.stringify({ id: e.id, name: e.name, type: 'movie' }));
                                    }}
                                >Show more
                                </Link>
                            </div>

                        </div>
                    ))}

                    {tv.map((e, index) => (

                        <div className='w-[100px] mb-2 md:w-[160px] relative group' key={index} tabIndex={0}>
                            <div className='absolute top-2 right-3 hidden group-focus:block md:group-hover:block cursor-pointer'
                                onClick={() => {
                                    let bookmarkDet = bookmark.filter((b) => (b.id !== e.id));
                                    removeBookmark(bookmarkDet);
                                    localStorage.setItem('bookmark', JSON.stringify(bookmarkDet));
                                }}
                            ><Heart className='fill-red-500 text-red-500' size={24} /></div>
                            <img src={e.poster} alt="" className='h-[22vh] md:h-[34vh] w-full object-contain rounded-lg' />
                            <div className='bg-[#191919] rounded-b-lg min-h-[12vh] w-full pl-2 py-2'>
                                <div>{e.name}</div>
                                <Link className=' text-amber-300 text-sm cursor-pointer mt-2'
                                    to={'/Show'}
                                    onClick={() => {
                                        setShowId({ id: e.id, type: 'tv' });
                                        localStorage.setItem('id', JSON.stringify({ id: e.id, type: 'tv' }));
                                        localStorage.setItem('lastSearch', JSON.stringify({ id: e.id, name: e.name, type: 'tv' }));
                                    }}
                                >Show more
                                </Link>
                            </div>

                        </div>
                    ))}

                </div>


            </div>
        </div>
    )
}

export default Wishlist
