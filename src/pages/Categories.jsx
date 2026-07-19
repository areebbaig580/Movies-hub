import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Popular from '../components/home/Popular';

const Categories = ({ setGenre, setShowId }) => {
    const [genreNames, setGenreNames] = useState([]);
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {

            const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${28}`
            const response = await fetch(URL);
            const data = await response.json();
            const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
            const genRes = await fetch(genreUrl);
            const gendata = await genRes.json();

            setGenreNames(gendata);
            setLoading(false);
        }
        fetchData();
    }, [])
    if (loading) return (<div>Loading</div>)
    else
        return (
            <div className='h-fit w-full md:mt-5  bg-black text-white px-4 pb-5 overflow-hidden flex flex-col gap-2'>
                <div className='md:text-lg text-amber-300'>All Categories</div>
                <div className='flex flex-wrap gap-4 md:w-6/10 w-full h-fit md:gap-6'>

                    {genreNames.genres.map((e, index) => (
                        <Link className='px-4 py-2 bg-[#370617] rounded-2xl cursor-pointer text-sm md:text-lg'
                            onClick={() => {
                                setGenre(e.id);
                                localStorage.setItem('genre', JSON.stringify(e.id));
                            }}
                            key={index} to={'/Discover'}>{e.name}</Link>
                    ))}
                </div>
                <Popular url={`https://api.themoviedb.org/3/discover/movie?api_key=`} label={'Top Action'} query={`&with_genres=${28}`} setShowId={setShowId} />
                <Popular url={`https://api.themoviedb.org/3/discover/movie?api_key=`} label={'Top Horror'} query={`&with_genres=${27}`} setShowId={setShowId} />
            </div>
        )
}

export default Categories
