import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Show from './pages/Show';
import Nav from './components/home/Nav';
import SearchPage from './pages/SearchPage';
import SearchBar from './components/home/SearchBar';

const App = () => {

  let id = JSON.parse(localStorage.getItem('id')) || '';
  const [showId, setShowId] = useState(id);

  return (
    <div className='min-h-[100vh] w-full bg-black text-white pb-5 overflow-hidden'>
      <Nav />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home setShowId={setShowId} />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/Show' element={<Show showId={showId} />} />
        <Route path='/SearchPage' element={<SearchPage setShowId={setShowId} />} />

      </Routes>
    </div>
  )
}

export default App
