import React, { useEffect, useState } from 'react'
import MovieDetail from './MovieDetail'
import { useParams } from 'next/navigation';
import { IMovie } from '@/interfaces/IMovie';
import { ICast, IVideo } from '@/interfaces/IMovieData';
import { Skeleton, Typography } from '@mui/material';
import * as  tmdbService from '@/services/tmdb/tmdb-services';

const MovieDetailController: React.FC = () => {
    const params = useParams();
    const movieId = params?.id;

    const [movie, setMovie] = useState<IMovie | null>(null);
    const [cast, setCast] = useState<ICast[]>([]);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        if (!movieId)
            return;


        fetchMovieDetails();
    }, [movieId]);


    const fetchMovieDetails = async () => {
        const [detailsRes, creditsRes, videosRes, similarRes] = await Promise.all([
            tmdbService.getMovieById(movieId),
            tmdbService.getMovieCreditsById(movieId),
            tmdbService.getMovieVideoById(movieId),
            tmdbService.getSimilarMovieById(movieId)
        ]);

        const details = await detailsRes.data;
        const credits = await creditsRes.data;
        const videos = await videosRes.data;
        const similarMovies = await similarRes.data;

        setMovie(details);
        setCast(credits.cast.slice(0, 6));
        const trailer = videos.results.find((v: IVideo) => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailerKey(trailer?.key ?? null);
        setSimilarMovies(similarMovies.results);
    };


    if (!movie)
        return (
            <div className='flex justify-center flex-col items-center'>
                <Typography className='items-center m-auto'>Loading movie details...</Typography>;
                <Skeleton className='w-[80%] !h-[200]' />
            </div>
        )


    return (
        <MovieDetail
            movie={movie}
            cast={cast}
            trailerKey={trailerKey}
            similarMovies={similarMovies}
        />
    )
}

export default MovieDetailController