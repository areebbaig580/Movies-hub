import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Show from './pages/Show';
import Nav from './components/home/Nav';
import SearchPage from './pages/SearchPage';
import SearchBar from './components/home/SearchBar';
import Discover from './pages/Discover';

const App = () => {

  let id = JSON.parse(localStorage.getItem('id')) || '';
  let genreId = JSON.parse(localStorage.getItem('genre')) || 12;

  const [showId, setShowId] = useState({id: id.id, type: id.type});
  const [genre, setGenre] = useState(genreId);
  const [bookmark, setBookmark] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('bookmark'));
    return saved ? saved : [];
  });

  return (
    <div className='min-h-[100vh] w-full bg-black text-white pb-5 overflow-hidden'>
      <Nav />
      <SearchBar />
      <Routes>

        <Route path='/' element={<Home setShowId={setShowId} bookmark={bookmark} setBookmark={setBookmark} />} />
        <Route path='/categories' element={<Categories setGenre={setGenre} setShowId={setShowId} />} />
        <Route path='/wishlist' element={<Wishlist setShowId={setShowId}/>} />
        <Route path='/Show' element={<Show showId={showId} setShowId={setShowId} />} />
        <Route path='/SearchPage' element={<SearchPage setShowId={setShowId} bookmark={bookmark} setBookmark={setBookmark} />} />
        <Route path='/Discover' element={<Discover genre={genre} setShowId={setShowId} bookmark={bookmark} setBookmark={setBookmark} />} />

      </Routes>
    </div>
  )
}

export default App
