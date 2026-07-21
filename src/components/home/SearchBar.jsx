import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { Search } from 'lucide-react';

const SearchBar = ({SearchType,setSearchType}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/SearchPage?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  }
  return (
    <div className='mx-5 mt-2 block md:hidden flex items-center gap-2'>

      <input type="text" className='bg-bg-2 rounded-md text-white px-2 py-1 w-full my-2 outline-none' placeholder='Search Movie/Tv' value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />

      <Dropdown SearchType={SearchType} setSearchType={setSearchType}/>
    </div>
  )
}

export default SearchBar
