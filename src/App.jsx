import React, { useEffect, useState } from 'react'
import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import TopRated from './components/home/TopRated';
import Popular from './components/home/Popular';
import SearchBar from './components/home/SearchBar';


const App = () => {
  return (
    <div className='min-h-[100vh] w-full bg-black text-white px-4 pb-5 overflow-hidden'>
      <Nav />
      <SearchBar/>
      <Hero />
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default App
