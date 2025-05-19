import React, { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMovieData } from '@/interfaces/IMovieData';
import { IconButton, Stack, Typography } from '@mui/material';
import MovieCard from '@/shared-components/movie-cards/MovieCard';
import MuiButton from '@/shared-components/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MovieCardSkeleton from '@/shared-components/CardSkeleton';
import { useUtils } from '@/utils/Utils';

interface IMovieSection {
    isLoading: boolean
    sectionTitle: string
    movieList: IMovieData
}

const btnClassName = 'absolute top-1/2 -translate-y-1/2 !z-10 bg-white rounded-full shadow-md';


const NextArrow = (props: any) => {
    const { className, onClick, style } = props;
    return (
        <div
            className={`${className} ${btnClassName} right-2`}
            style={{
                ...style,
                right: '35px',
            }}
            onClick={onClick}
        >
            <ArrowCircleRightIcon className="!text-5xl !text-blue-600 hover:!text-blue-900" />
        </div>
    );
};

const PrevArrow = (props: any) => {
    const { className, onClick, style } = props;
    return (
        <div
            className={`${className} ${btnClassName} left-2`}
            style={{
                ...style,
                left: '10px',
            }}
            onClick={onClick}
        >
            <ArrowCircleLeftIcon className="!text-5xl !text-blue-600 hover:!text-blue-900" />
        </div>
    );
};


const MovieSection: React.FC<IMovieSection> = (props) => {

    const { movieList, isLoading, sectionTitle } = props;

    const { getRandomCount } = useUtils();


    const settings = useMemo(() => getSettings(movieList, movieList?.results?.length > 0), [movieList]);

    const skeletonCount = useMemo(() => getRandomCount(), [])

    return (
        <Stack direction={'column'}>
            {sectionTitle && <Typography className="!text-2xl !font-bold !ml-4">{sectionTitle}</Typography>}

            <div className='slider-container relative w-full pl-4 [&_.slick-track]:!py-4 [&_.slick-slider]:w-full [&_.slick-slider]:px-16 [&_.slick-dots]:!-bottom-[30px] [&_.slick-dots]:!w-[90%]'
            >
                <Slider {...settings} className=''>
                    {
                        isLoading ?

                            Array.from({ length: skeletonCount }).map((_, index) => (
                                <MovieCardSkeleton key={`skeleton-${index}`} />
                            ))
                            :
                            movieList?.results?.map((movie, index) => {
                                return (
                                    <MovieCard
                                        movie={movie}
                                        key={`${index}nowPlayingMovies`}
                                    />
                                )
                            })
                    }
                </Slider>
            </div>
        </Stack>
    )
}

export default MovieSection;


const getSettings = (nowPlayingMovies: IMovieData, isLoading: boolean) => {

    const totalSlides = nowPlayingMovies?.results?.length ?? 0;

    return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,
        nextArrow: !isLoading ? undefined : <NextArrow />,
        prevArrow: !isLoading ? undefined : <PrevArrow />,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: totalSlides > 5,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: totalSlides > 4,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: totalSlides > 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: totalSlides > 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: totalSlides > 1,
                },
            },
        ],
    };
}