import { Clock, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Popular from '../components/home/Popular';
import Bookmark from '../components/wishlist/Bookmark';

const Show = ({ showId, setShowId, bookmark, setBookmark }) => {
    const API_KEY = "a3cc59d361435c6d960d428362f80a62";
    const [movieData, SetMovieData] = useState([]);
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState([]);
    const [castInfo, setCastInfo] = useState([]);

    useEffect(() => {
        const fetchMOvie = async () => {
            let url = '';
            let Cast = '';
            let season = '';
            let seasonFetch = '';
            let seasonData = '';
            let watchProviders = '';

            if (showId.type === 'movie') {
                url = `https://api.themoviedb.org/3/movie/${showId.id}?api_key=${API_KEY}`;
                Cast = `https://api.themoviedb.org/3/movie/${showId.id}/credits?api_key=${API_KEY}`
                watchProviders = `https://api.themoviedb.org/3/movie/${showId.id}/watch/providers?api_key=${API_KEY}`
            } else {
                url = `https://api.themoviedb.org/3/tv/${showId.id}?api_key=${API_KEY}`;
                Cast = `https://api.themoviedb.org/3/tv/${showId.id}/credits?api_key=${API_KEY}`
                watchProviders = `https://api.themoviedb.org/3/tv/${showId.id}/watch/providers?api_key=${API_KEY}`
                season = `https://api.themoviedb.org/3/tv/${showId.id}/season/${1}?api_key=${API_KEY}`;
                seasonFetch = await fetch(season);
                seasonData = await seasonFetch.json();
            }
            const response = await fetch(url);
            const data = await response.json();
            const CastFetch = await fetch(Cast);
            const CastData = await CastFetch.json();
            const providers = await fetch(watchProviders);
            const providersJson = await providers.json();

            let providerData = providersJson.results.IN;
            let providerlink = [];

            if (providerData) {

                if ('rent' in providerData) {

                    providerlink.push(...providerData.rent);
                }

                if ('flatrate' in providerData) {
                    providerlink.push(...providerData.flatrate);

                }
            }
            //Movie info collection

            let genreNAme = [];
            let cast = [];
            let prName = [];
            let prLogo = [];

            let genres = data.genres;
            genres.forEach(element => {
                genreNAme.push(element.name)
            });

            for (let i = 0; i < CastData.cast.length; i++) {
                let castname = CastData.cast[i].name;
                cast.push(castname)
            }

            let backdrop = `${posterUrl}${data.backdrop_path}`
            let poster = `${posterUrl}${data.poster_path}`;
            let name = '';
            let releasedate = '';
            let runtime = '';
            if (showId.type === 'movie') { name = data.title, releasedate = data.release_date, runtime = data.runtime }
            else { name = data.name, releasedate = seasonData.air_date, runtime = '' };

            let posterData = [{
                back: poster,
                name: name,
                release: releasedate,
                rating: data.vote_average,
                lang: data.spoken_languages,
                synop: data.overview,
                genre: genreNAme,
                time: data.runtime,
                tagline: data.tagline,
                castName: cast,
                posterImg: backdrop
            }];

            //cast info collection
            let castI = [];

            for (let i = 0; i < CastData.cast.length; i++) {
                let info = {};
                let personName = CastData.cast[i].name;
                let character = CastData.cast[i].character;
                let profile = `${posterUrl}${CastData.cast[i].profile_path}`

                info = { name: personName, char: character, profile: profile };
                castI.push(info);
            }

            SetMovieData(posterData);
            setLoading(false);
            setCastInfo(castI);
            setProvider(providerlink);
        }
        fetchMOvie();
    }, [showId])

    if (loading) return (<div className='min-h-[100vh] px-2 py-2 bg-[#131313]'>Loading...</div>)
    else
        return (
            <div className='px-2 flex flex-col gap-2'>
                <div className='h-fit w-full flex pb-5 bg-[#0c0c0c] rounded-lg overflow-hidden pt-4 group relative'>
                    <Bookmark bookmark={bookmark} setBookmark={setBookmark} id={showId.id} categ={showId.type} />

                    <img src={movieData[0].back} alt="" className='h-[50vh] object-contain hidden md:block' />
                    <div className='flex flex-col gap-2 h-full w-full md:w-[80vw]  px-4'>
                        <div className='text-3xl md:text-5xl font-semibold mb-2'>{movieData[0].name}</div>
                        <div className='text-white/60'>{movieData[0].tagline}</div>

                        <div className='flex gap-2 mb-2 h-fit w-fit flex-wrap'>
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
                            <div className='flex gap-2 items-center '>{movieData[0].time && (<Clock size={22} />)} {movieData[0].time && (`${movieData[0].time} min`)}</div>
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
                        <div className=' flex gap-2 flex-col'>

                            <div className='text-amber-300'>Watch Providers</div>
                            <div className='flex gap-3 md:gap-6 mb-2 h-fit w-full flex-wrap'>

                                {provider.length > 1 ? (

                                    provider.map((p, index) => (

                                        <div className='flex flex-col gap-2' key={index}>
                                            <img src={`${posterUrl}${p.logo_path}`} alt="" className='w-[6vh] md:w-[8vh] object-contain ' />
                                            <div className='h-fit w-[8vh] text-xs md:text-sm text-white/70 '>{p.provider_name}</div>
                                        </div>

                                    ))
                                ) : (
                                    <div className='text-white/70 h-fit w-fit px-2 bg-white/7 py-1 rounded-lg'>No Providers Available</div>
                                )
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className='h-fit w-full bg-[#0c0c0c] px-4'>
                    <div className='text-amber-300 text-xl'>Cast</div>
                    <div className='h-fit w-full flex gap-5 overflow-x-auto overflow-y-hidden movie-row my-2'>
                        {castInfo.map((c, index) => (

                            <div className='w-[130px] md:w-[160px] shrink-0' key={index}>

                                <img src={c.profile} alt={c.name} className='h-[28vh] md:h-[34vh] w-full object-contain rounded-lg' />
                                <div className='w-full bg-[#191919] py-2 px-2 rounded-lg'>
                                    <div>{c.name}</div>
                                    <div className='text-white/60'>{c.char}</div>
                                </div>
                            </div>

                        ))}
                    </div>

                </div>
                <div className='h-fit w-full bg-[#0c0c0c] px-4'>

                    <Popular url={`https://api.themoviedb.org/3/${showId.type}/${showId.id}/recommendations?api_key=`} label={`More like this`} setShowId={setShowId} query={''} categ={showId.type} bookmark={bookmark} setBookmark={setBookmark} />
                </div>


            </div>
        )
}

export default Show
