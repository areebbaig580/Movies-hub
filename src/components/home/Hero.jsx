import React, { useEffect, useState } from 'react'

const Hero = () => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    const [movies, setMovies] = useState([]);
    const [poster, setPoster] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
            const genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

            const response = await fetch(URL);
            const responseGenre = await fetch(genre);
            const data = await response.json();
            console.log(data);
            const genreData = await responseGenre.json();
            let images = [];
            let genreNAme = [];
            let posterPath = data.results[0].backdrop_path;
            let posterGenreIds = data.results[0].genre_ids;

            let posterGenre = genreData.genres.filter(genre =>
                posterGenreIds.includes(Number(genre.id))
            );
            posterGenre.forEach(element => {
                genreNAme.push(element.name)
            });

            let poster = [{ poster: `${posterUrl}${posterPath}`, genre: genreNAme, title: data.results[0].title, release: data.results[0].release_date, overview: data.results[0].overview }];

            for (let i = 1; i < 4; i++) {
                let imgGenreName = [];
                let card = {};
                let imgPath = data.results[i].poster_path;
                let title = data.results[i].title;
                let imgGenreIds = data.results[i].genre_ids;
                let imgGenre = genreData.genres.filter(genre =>
                    imgGenreIds.includes(Number(genre.id))
                );
                imgGenre.forEach(element => {
                    imgGenreName.push(element.name)
                });
                let overview = data.results[i].overview;
                let img = `${posterUrl}${imgPath}`;
                card = { title: title, overview: overview, img: img, genre: imgGenreName };

                images.push(card);
            }
            setPoster(poster);
            setMovies(images);
            setLoading(false);
        };
        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className='flex h-fit w-full gap-2 items-center'>

                <div className='h-fit w-fit relative rounded-lg overflow-hidden'>

                    <img src={poster[0].poster} alt="" className='h-[90vh] w-fit object-contain' />
                    <div className='absolute bottom-0 left-0 pb-10 pl-8'>
                        <div className='text-5xl font-semibold mb-4'>{poster[0].title}</div>
                        <div className='flex gap-2 mb-2'>
                            {poster[0].genre.map((g, index) => (
                                <span key={index} className='px-2 py-1 bg-white/10 rounded-full text-sm'>
                                    {g}
                                </span>
                            ))}
                        </div>
                        <div className='w-7/10 mb-3'>{poster[0].overview}</div>
                        <div className='text-white/65'>{poster[0].release}</div>
                    </div>
                    <div className='absolute bottom-0 right-0 pb-10 pr-6'>
                        <div className='px-2 py-1 text-amber-300 cursor-pointer'>Show more</div>
                    </div>

                </div>

                <div className='w-3/10 flex flex-col gap-2'>
                    <div className='h-[42vh] w-full flex'>
                        <img src={movies[0].img} alt="" className='h-full w-fit object-contain rounded-lg' />
                        <div className='h-full w-full  px-2 py-2 relative'>
                            <div className='text-2xl font-semibold mb-2'>{movies[0].title}</div>
                            <div className='flex h-fit flex-wrap gap-2 mb-5'>
                                {movies[0].genre.map((g, index) => (
                                    <span key={index} className=' text-white/65 rounded-full text-sm'>
                                        {g}
                                    </span>
                                ))}

                            </div>
                            <div className='text-sm'>{movies[0].overview}</div>
                            <div className='absolute bottom-0 pl-0.5 pb-4'>
                                <div className=' text-amber-300 text-sm cursor-pointer'>Show more</div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[42vh] w-full flex'>
                        <img src={movies[1].img} alt="" className='h-full w-fit object-contain rounded-lg' />
                        <div className='h-full w-full  px-2 py-2 relative'>
                            <div className='text-2xl font-semibold mb-2'>{movies[1].title}</div>
                            <div className='flex h-fit flex-wrap gap-2 mb-5'>
                                {movies[1].genre.map((g, index) => (
                                    <span key={index} className=' text-white/65 rounded-full text-sm'>
                                        {g}
                                    </span>
                                ))}

                            </div>
                            <div className='text-sm'>{movies[1].overview}</div>
                            <div className='absolute bottom-0 pl-0.5 pb-4'>
                                <div className=' text-amber-300 text-sm cursor-pointer'>Show more</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Hero
