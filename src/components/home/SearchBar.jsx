import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { Search } from 'lucide-react';

const SearchBar = ({ SearchType, setSearchType, query, setQuery }) => {
  const navigate = useNavigate();


  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim()) {
          navigate(`/SearchPage?q=${encodeURIComponent(query)}`);
          setQuery('');
        }
      }}
      className='mx-5 mt-2 md:hidden flex items-center gap-2'
    >
      <input
        type="search"
        enterKeyHint="search"
        className='bg-bg-2 rounded-md text-white px-2 py-1 w-full my-2 outline-none'
        placeholder='Search Movie/Tv'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Dropdown SearchType={SearchType} setSearchType={setSearchType} />
    </form>

  )
}

export default SearchBar
