import { Heart } from 'lucide-react';
import React from 'react'

const Bookmark = ({bookmark , setBookmark , id}) => {
    return (
        <div className='absolute top-2 right-3 hidden group-focus:block md:group-hover:block cursor-pointer'
            onClick={() => {
                const isBookmarked = bookmark.some((b) => b === id);
                const updated = isBookmarked ? bookmark.filter((b) => b !== id) : [...bookmark, id];
                setBookmark(updated);
                localStorage.setItem('bookmark', JSON.stringify(updated));
            }}
        >{bookmark.some((b) => b === id) ? <Heart className='fill-red-500 text-red-500' size={24} /> : <Heart className='text-white' size={22} />}
        </div>
    )
}

export default Bookmark
