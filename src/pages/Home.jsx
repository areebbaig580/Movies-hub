import React from 'react'
import Hero from '../components/home/Hero'
import Popular from '../components/home/Popular';

const Home = ({ setShowId, bookmark, setBookmark }) => {
    const lastGenre = JSON.parse(localStorage.getItem('lastGenre'));
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    return (
        <div className='min-h-[100vh] w-full bg-black text-white px-2 pb-5 overflow-hidden'>
            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>

                <Hero setShowId={setShowId} bookmark={bookmark} setBookmark={setBookmark} />
            </div>

            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>

                <Popular url={'https://api.themoviedb.org/3/movie/popular?api_key='} label={'Popular Movies'} setShowId={setShowId} query={''} bookmark={bookmark} setBookmark={setBookmark}/>
            </div>
            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>

                <Popular url={'https://api.themoviedb.org/3/movie/top_rated?api_key='} label={'Top Rated Movies'} setShowId={setShowId} query={''} bookmark={bookmark} setBookmark={setBookmark}/>
            </div>
            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>
                <Popular url={'https://api.themoviedb.org/3/trending/tv/day?api_key='} label={'Trending Shows'} setShowId={setShowId} query={''} categ={'tv'} bookmark={bookmark} setBookmark={setBookmark}/>
            </div>
           
            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>

                {lastSearch && (

                    <Popular url={`https://api.themoviedb.org/3/${lastSearch.type}/${lastSearch.id}/recommendations?api_key=`} label={`Keep exploring ${lastSearch.name}`} query={''} setShowId={setShowId} categ={lastSearch.type} bookmark={bookmark} setBookmark={setBookmark}/>
                )}
            </div>
            <div className='h-fit w-full bg-[#0c0c0c] px-4 mb-3'>

                {lastGenre && (

                    <Popular url={`https://api.themoviedb.org/3/discover/movie?api_key=`} label={`More on ${lastGenre.name}`} query={`&with_genres=${lastGenre.id}`} setShowId={setShowId} categ={'movie'} bookmark={bookmark} setBookmark={setBookmark}/>
                )}
            </div>
            

        </div>
    )
}

export default Home
