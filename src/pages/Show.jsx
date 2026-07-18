import { Clock, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Show = ({ showId }) => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const [movieData, SetMovieData] = useState([]);
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState([]);
    const [castInfo, setCastInfo] = useState([]);

    useEffect(() => {
        const fetchMOvie = async () => {
            const URL = `https://api.themoviedb.org/3/movie/${showId}?api_key=${API_KEY}`;
            const Cast = `https://api.themoviedb.org/3/movie/${showId}/credits?api_key=${API_KEY}`
            const watchProviders = `https://api.themoviedb.org/3/movie/${showId}/watch/providers?api_key=${API_KEY}`
            const response = await fetch(URL);
            const data = await response.json();
            const CastFetch = await fetch(Cast);
            const CastData = await CastFetch.json();
            const providers = await fetch(watchProviders);
            const providersData = await providers.json();
            
            //Movie info collection

            let genreNAme = [];
            let cast = [];
            let prName = [];
            let prLogo = [];
            
            let genres = data.genres;
            genres.forEach(element => {
                genreNAme.push(element.name)
            });

            for (let i = 0; i < 6; i++) {
                let name = CastData.cast[i].name;
                cast.push(name)
            }
            
            let backdrop = `${posterUrl}${data.backdrop_path}`
            let poster = `${posterUrl}${data.poster_path}`;
            
            let posterData = [{
                back: poster, name: data.title, release: data.release_date, rating: data.vote_average, lang: data.spoken_languages,
                synop: data.overview, genre: genreNAme, time: data.runtime, tagline: data.tagline, castName: cast, posterImg: backdrop
            }];
            
            //cast info collection
            let castI = [];
            
            for (let i = 0; i < 10; i++) {
                let info = {};
                let name = CastData.cast[i].name;
                let character = CastData.cast[i].character;
                let profile = `${posterUrl}${CastData.cast[i].profile_path}`
                
                info = { name: name, char: character, profile: profile };
                castI.push(info);
            }
            
            SetMovieData(posterData);
            setLoading(false);
            setCastInfo(castI);
        }
        fetchMOvie();
    }, [])

    if (loading) return (<div>Loading</div>)
    else
        return (
            <div className='px-2 flex flex-col gap-2'>
                <div className='h-fit w-full flex mt-3 pb-5 bg-[#0c0c0c] rounded-lg overflow-hidden pt-4'>

                    <img src={movieData[0].back} alt="" className='h-[50vh] object-contain hidden md:block' />
                    <div className='flex flex-col gap-2 h-full w-full md:w-[80vw]  px-4'>
                        <div className='text-3xl md:text-5xl font-semibold mb-2'>{movieData[0].name}</div>
                        <div className='text-white/60'>{movieData[0].tagline}</div>

                        <div className='flex gap-2 mb-2'>
                            {movieData[0].genre.map((g, index) => (
                                <span key={index} className='px-2 py-1 bg-white/10 rounded-full text-xs md:text-sm'>
                                    {g}
                                </span>
                            ))}
                        </div>
                        <img src={movieData[0].posterImg} alt="" className='block md:hidden w-full' />
                        <div >{movieData[0].release}</div>


                        <div className='flex gap-4 mb-2 items-center'>

                            <div className='flex gap-2 items-center '><Star className='text-amber-400' size={22} /> {movieData[0].rating.toFixed(1)}</div>
                            <div className='flex gap-2 items-center '><Clock size={22} /> {movieData[0].time}</div>
                        </div>
                        <div className='text-amber-300'>Synopsis</div>
                        <div className='w-full text-white rounded-lg '>{movieData[0].synop}</div>
                        <div className=' flex gap-2 flex-col'>

                            <div className='text-amber-300'>Languages</div>
                            <div className='flex gap-2 mb-2'>
                                {movieData[0].lang.map((g, index) => (
                                    <span key={index} className='text-xs md:text-sm text-white/70'>
                                        {g.english_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className=' flex gap-2 flex-col'>

                            <div className='text-amber-300'>Cast</div>
                            <div className='flex gap-2 mb-2 h-fit w-fit flex-wrap'>
                                {movieData[0].castName.map((c, index) => (
                                    <span key={index} className='text-xs md:text-sm text-white/70'>
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-fit w-full bg-[#0c0c0c] px-4'>
                    <div className='text-amber-300 text-xl'>Cast</div>
                    <div className='h-fit w-full flex gap-5 overflow-x-auto overflow-y-hidden movie-row my-2'>
                        {castInfo.map((c, index) => (

                            <div className='w-[160px] shrink-0 mb-2 md:w-[200px]' key={index}>

                                <img src={c.profile} alt={c.name} className='h-[26vh] md:h-[42vh] w-full object-contain rounded-lg' />
                                <div className='w-full bg-[#191919] py-2 px-2'>
                                    <div>{c.name}</div>
                                    <div className='text-white/60'>{c.char}</div>
                                </div>
                            </div>

                        ))}


                    </div>

                </div>

            </div>
        )
}

export default Show
