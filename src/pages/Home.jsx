import React from 'react'
import Hero from '../components/home/Hero'
import Popular from '../components/home/Popular';
import SearchBar from '../components/home/SearchBar';

const Home = ({ setShowId }) => {
    return (
        <div className='min-h-[100vh] w-full bg-black text-white px-2 pb-5 overflow-hidden'>
            <SearchBar />
            <Hero setShowId={setShowId} />
            <Popular url={'https://api.themoviedb.org/3/movie/popular?api_key='} label={'Popular Movies'} setShowId={setShowId} />
            <Popular url={'https://api.themoviedb.org/3/movie/top_rated?api_key='} label={'Top Rated'} setShowId={setShowId} />
            <Popular url={'https://api.themoviedb.org/3/trending/tv/day?api_key='} label={'Trending Series'} setShowId={setShowId} />

        </div>
    )
}

export default Home
