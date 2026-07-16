import React, { useEffect, useState } from 'react'

const TopRated = () => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const imgUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

            const response = await fetch(URL);
            const data = await response.json();
            let topthree = [];

            for (let i = 0; i < 6; i++) {
                let res = data.results[i].poster_path;
                let poster = `${imgUrl}${res}`;
                topthree.push(poster);

            }
            setMovies(topthree);
        };
        fetchData();
    }, [])

    return (
        <>

            <div className='h-fit py-4 font-semibold text-lg  '>Top rated</div>
            <div className='h-fit w-full flex justify-evenly '>
                {movies.map((poster, index) =>

                    <img src={poster} key={index} alt="" className='h-[40vh] w-[15vw] object-contain rounded-lg' />
                )}
            </div>
        </>
    )
}

export default TopRated
