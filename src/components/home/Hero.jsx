import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeroComponent from './HeroComponent';
import HeroPoster from './HeroPoster';

const Hero = ({ setShowId }) => {
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
            let movieData = [];
            let genreNAme = [];
            let posterPath = data.results[0].backdrop_path;
            let posterGenreIds = data.results[0].genre_ids;

            let posterGenre = genreData.genres.filter(genre =>
                posterGenreIds.includes(Number(genre.id))
            );
            posterGenre.forEach(element => {
                genreNAme.push(element.name)
            });

            let posterData = [{ poster: `${posterUrl}${posterPath}`, genre: genreNAme, title: data.results[0].title, release: data.results[0].release_date, overview: data.results[0].overview, id: data.results[0].id }];

            for (let i = 1; i < 3; i++) {
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
                let ident = data.results[i].id;
                let img = `${posterUrl}${imgPath}`;
                card = { title: title, overview: overview, img: img, genre: imgGenreName, id: ident };

                movieData.push(card);
            }
            setPoster(posterData);
            setMovies(movieData);
            setLoading(false);
        };
        fetchData();
    }, [])
    console.log(movies);

    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className='flex h-fit w-full gap-2 items-center flex-col md:flex-row'>

                <HeroPoster poster={poster} />

                <div className='w-full flex gap-2 flex-col md:w-3/10'>
                    <HeroComponent movies={movies} />
                </div>

            </div>
        )
    }
}

export default Hero
