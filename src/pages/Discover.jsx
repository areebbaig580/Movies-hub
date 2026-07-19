import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Bookmark from '../components/wishlist/Bookmark';

const Discover = ({ genre, setShowId ,bookmark, setBookmark }) => {
  const API_KEY = "a3cc59d361435c6d960d428362f80a62";
  const posterUrl = 'https://image.tmdb.org/t/p/original';
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {

      const pages = await Promise.all(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page =>
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`)
            .then(res => res.json())
        )
      );

      const movieData = pages.flatMap(data =>
        data.results
          .filter(m => m.poster_path)
          .map(m => ({ name: m.title, poster: `${posterUrl}${m.poster_path}`, id: m.id }))
      );

      setMovies(movieData);
      setLoading(false);
    }
    fetchData();
  }, [])
  if (loading) return (<div>Loading</div>)
  return (
    <div className='h-fit w-full flex flex-wrap py-4 bg-[#131313] md:gap-5 justify-center gap-3 px-1 md:px-2'>
      {movies.map((e, index) => (

        <div className='w-[100px] mb-2 md:w-[160px] relative group' key={index} tabIndex={0}>
          <Bookmark bookmark={bookmark} setBookmark={setBookmark} id={e.id} />
          <img src={e.poster} alt="" className='h-[18vh] md:h-[34vh] w-full object-contain rounded-lg' />
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

export default Discover
