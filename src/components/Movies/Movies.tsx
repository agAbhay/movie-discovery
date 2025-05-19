import React, { useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMovieData } from '@/interfaces/IMovieData';
import { IconButton, Stack, Typography } from '@mui/material';
import { IButton } from '@/interfaces/IButtons';

import MovieSection from './MovieSection';
import ButtonsGroup from '@/shared-components/ButtonsGroup';


interface IMovies {
    nowPlayingMovies: IMovieData
    currentSelectedGenreMovieList: IMovieData
    isGenreDataLoading: boolean
    isNowPlayingDataLoading: boolean
    onClickGenreHandler: (genreIds: number[]) => void
}


const Movies: React.FC<IMovies> = (props) => {

    const { nowPlayingMovies, isNowPlayingDataLoading, onClickGenreHandler, currentSelectedGenreMovieList, isGenreDataLoading } = props;


    const buttons: IButton[] = useMemo(() => [
        { label: 'Feel Good', genreIds: [35, 10749, 18], onClick: onClickGenreHandler },
        { label: 'Action Fix', genreIds: [28], onClick: onClickGenreHandler },
        { label: 'Mind Benders', genreIds: [9648, 878, 53], onClick: onClickGenreHandler },
        { label: 'Sci-Fi', genreIds: [878], onClick: onClickGenreHandler },
        { label: 'Horror', genreIds: [27], onClick: onClickGenreHandler },
    ], [])


    return (

        <Stack direction={'column'} gap={4} marginBottom={20}>

            <Stack direction={'row'} className='flex gap-4 items-center'>
                <Typography className="!text-2xl !font-bold !ml-4">Select genre: </Typography>
                <ButtonsGroup

                    buttons={buttons}
                />
            </Stack>

            <MovieSection
                isLoading={isGenreDataLoading}
                movieList={currentSelectedGenreMovieList}
                sectionTitle=""
            />

            <MovieSection
                isLoading={isNowPlayingDataLoading}
                movieList={nowPlayingMovies}
                sectionTitle='Now playing'
            />

        </Stack>

    )
}

export default Movies;



