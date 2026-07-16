import React, { useEffect, useState } from 'react'
import Nav from './components/home/Nav'
import Hero from './components/home/Hero'
import TopRated from './components/home/TopRated';
import PopularMOv from './components/home/PopularMOv';

const App = () => {
  return (
    <div className='min-h-[100vh] w-full bg-black text-white px-4 pb-5 overflow-hidden'>
      <Nav />
      <Hero />
      <PopularMOv/>
      <TopRated/>
    </div>
  )
}

export default App
