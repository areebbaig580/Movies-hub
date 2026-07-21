import React from 'react'

const Dropdown = ({SearchType,setSearchType}) => {
    return (
        <select name="" id="" value={SearchType} onChange={(e) => {
            setSearchType(e.target.value);
            localStorage.setItem('searchType', JSON.stringify(e.target.value))
        }} className='cursor-pointer bg-bg-2 h-fit w-fit py-1 rounded-lg outline-none text-sm md:text-[1rem]'>
            <option value="movie">Movies</option>
            <option value="tv">Tv</option>
        </select>
    )
} 

export default Dropdown
