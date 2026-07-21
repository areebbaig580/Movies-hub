import React, { useState } from 'react'
import { TvMinimalPlay } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

const Nav = ({ SearchType,setSearchType , query ,setQuery}) => {
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            navigate(`/SearchPage?q=${encodeURIComponent(query)}`);
            setQuery('');
        };
    }
    return (
        <div className='h-fit w-full flex  pt-2 items-center gap-5 px-4'>
            <div className='text-md md:text-lg font-bold text-amber-300 py-1px-1 rounded-lg flex gap-2 items-center'><TvMinimalPlay /> MovieHub</div>
            <div className=' flex  justify-between w-9/10 '>
                <div className='flex gap-5'>
                    <Link className='text-sm md:text-md font-semibold ' to={'/'}>Home</Link>
                    <Link className='text-sm md:text-md font-semibold ' to={'/categories'} >Categories</Link>
                    <Link className='text-sm md:text-md font-semibold ' to={'/wishlist'} >Wishlist</Link>
                </div>
                <div className='gap-2  hidden md:flex items-center'>
                    Search <input type="text" className='bg-white rounded-md text-black px-2 w-7/10' placeholder='Search' value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
               <Dropdown SearchType={SearchType} setSearchType={setSearchType} />
                </div>

            </div>
        </div>
    )
}

export default Nav
