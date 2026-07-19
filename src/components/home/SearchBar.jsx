import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/SearchPage?q=${encodeURIComponent(query)}`);
      localStorage.setItem('lastSearch', JSON.stringify(query));
      setQuery('');
    }
  }
  return (
    <div className='mx-2 mt-2'>
      <input type="text" className='bg-bg-2 rounded-md text-white px-2 py-1 w-full block md:hidden my-2 outline-none' placeholder='Search Movies' value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchBar
