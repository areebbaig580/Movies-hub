import React, { useEffect, useState } from 'react'

const Hero = () => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);
    const [poster, setPoster] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
            const genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

            const response = await fetch(URL);
            const responseGenre = await fetch(genre);
            const data = await response.json();
            const genreData = await responseGenre.json();
            console.log(genreData)
            let images = [];
            let posterPath = data.results[0].backdrop_path;
            let poster = `${posterUrl}${posterPath}`;


            for (let i = 1; i < 4; i++) {
                let imgPath = data.results[i].poster_path;
                let img = `${posterUrl}${imgPath}`;
                images.push(img);
            }
            setPoster(poster);
            setMovies(images);
        };
        fetchData();
    }, [])

    return (
        <div className='flex h-fit w-full gap-2 items-center'>
            <div className='h-fit w-fit relative rounded-lg overflow-hidden'>
                <img src={poster} alt="" className='h-[90vh] w-fit object-contain' />
                <div className='absolute bottom-0 left-0 pb-10'></div>

            </div>

            <div className='w-3/10 flex flex-col gap-2 bg-black'>
                <div className='h-[42vh] w-full flex rounded-lg overflow-hidden'>
                    <img src={movies[0]} alt="" className='h-full w-fit object-contain' />
                    <div className='h-full w-5/10'></div>
                </div>
                <div className='h-[42vh] w-full flex rounded-lg overflow-hidden'>
                    <img src={movies[1]} alt="" className='h-full w-fit object-contain' />
                    <div className='h-full w-5/10 '></div>
                </div>

            </div>

        </div>
    )
}

export default Hero
