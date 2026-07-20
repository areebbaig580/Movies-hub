import { Heart } from 'lucide-react';
import React from 'react'

const Bookmark = ({ bookmark, setBookmark, id, categ }) => {
    
    const isBookmarked = bookmark.some((b) => b.id === id && b.type === categ);
    return (
        <div className='absolute top-2 right-3 hidden group-focus:block md:group-hover:block cursor-pointer'
            onClick={() => {
                const updated = isBookmarked ? bookmark.filter((b) => !(b.id === id && b.type === categ)) : [...bookmark, { id: id, type: categ }];
                setBookmark(updated);
                localStorage.setItem('bookmark', JSON.stringify(updated));
            }}
        >{bookmark.some((b) => b.id === id && b.type === categ) ? <Heart className='fill-red-500 text-red-500' size={24} /> : <Heart className='text-white' size={22} />}
        </div>
    )
}

export default Bookmark
