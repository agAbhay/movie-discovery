import React, { useEffect, useState } from 'react'
import Movies from './Movies';
import * as  tmdbService from '@/services/tmdb/tmdb-services';
import { IMovie } from '@/interfaces/IMovie';
import { IMovieData } from '@/interfaces/IMovieData';

const MoviesController: React.FC = () => {

    const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieData>({} as IMovieData);
    const [isNowPlayingDataLoading, setIsNowPlayingDataLoading] = useState<boolean>(false);
    const [isGenreDataLoading, setIsGenreDataLoading] = useState<boolean>(false);
    const [currentSelectedGenreMovieList, setCurrentSelectedGenreMovieList] = useState<IMovieData>({} as IMovieData);

    useEffect(() => {
        setIsNowPlayingDataLoading(true);

        getNowPlayingMovies();
    }, [])



    const getNowPlayingMovies = async () => {

        const movieData = await tmdbService.getNowPlayingMovieList();

        setNowPlayingMovies(movieData.data);

        setIsNowPlayingDataLoading(false);
    }


    const onClickGenreHandler = async (genreIds: number[]) => {
        setIsGenreDataLoading(true);
        const movieData = await tmdbService.getMovieByGenre(genreIds);

        setCurrentSelectedGenreMovieList(movieData.data);

        setIsGenreDataLoading(false);
    }

    return (
        <Movies
            nowPlayingMovies={nowPlayingMovies}
            isNowPlayingDataLoading={isNowPlayingDataLoading}
            isGenreDataLoading={isGenreDataLoading}
            onClickGenreHandler={onClickGenreHandler}
            currentSelectedGenreMovieList={currentSelectedGenreMovieList}
        />
    )
}

export default MoviesController