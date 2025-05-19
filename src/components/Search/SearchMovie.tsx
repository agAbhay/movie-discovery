import React, { useState, useEffect, RefObject, useMemo } from 'react'
import { Box, Divider, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import { useResponsive } from "@/utils/responsive";
import { IMovieData } from "@/interfaces/IMovieData";
import { useRouter } from 'next/navigation';
import { IArtist } from '@/interfaces/IArtist';
import { IMovie } from '@/interfaces/IMovie';
import MovieCardSkeleton from '@/shared-components/CardSkeleton';
import MovieCard from '@/shared-components/movie-cards/MovieCard';
import { useUtils } from '@/utils/Utils';


interface ISearchMovie {
    isLoading: boolean
    closeSearchMenu(): void
    closeSearchPopover: () => void
    searchInputRef: RefObject<HTMLInputElement | null>
    setSearchedKey: React.Dispatch<React.SetStateAction<string>>
    searchedMoviesByPerson: IArtist[]
    searchedMovies: IMovie[]
}
const SearchMovie: React.FC<ISearchMovie> = (props) => {

    const { closeSearchMenu, setSearchedKey, isLoading, searchedMovies, searchedMoviesByPerson } = props;

    const { isMobile } = useResponsive();
    const { getRandomCount } = useUtils();

    const router = useRouter();

    const skeletonCount = useMemo(() => getRandomCount(), [])

    const goToPage = (id: number) => {
        router.push(`/movie/${id}`);
    };

    const searchedArtist = useMemo(() => searchedMoviesByPerson.at(0), [searchedMoviesByPerson]);

    return (
        <div className={`p-1 mt-2 bg-white rounded-lg shadow-xl ${(isMobile) ? 'fixed w-full bottom-0 h-[calc(100vh - 112px)] top-[106px]' : `w-full`}`}>

            <Stack className={`md:max-h-[80vh] px-2.5 py-3 ${isMobile ? 'h-[calc(100vh_-_120px)]' : ''} overflow-auto`}>

                <Typography variant="h6" className="text-blue-600 mb-2 font-semibold">
                    Movies
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={2} marginBottom={4}>
                    {isLoading ? (
                        Array.from({ length: skeletonCount }).map((_, index) => (
                            <MovieCardSkeleton key={`skeleton-${index}`} />
                        ))
                    ) : (
                        searchedMovies.map((movie, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchedKey('');
                                    closeSearchMenu();
                                    goToPage(movie.id);
                                }}
                                className="cursor-pointer"
                            >
                                <MovieCard movie={movie} />
                            </div>
                        ))
                    )}
                </Box>

                <Divider className='border-gray-500 !mb-5' />


                {
                    searchedMoviesByPerson.length > 0 && (
                        <>
                            <Typography variant="h6" className="text-blue-600 mt-6 mb-2 font-semibold">
                                {searchedArtist?.name} Movies
                            </Typography>

                            <Typography className="mt-6 !mb-4 font-semibold ">
                                Department: {searchedArtist?.known_for_department}, Popularity: {searchedArtist?.popularity},
                            </Typography>

                            {searchedMoviesByPerson.map((artist, index) => (

                                <Box key={`artist-${index}`} className="mb-6">

                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                        {artist.known_for?.map((movie, idx) => (
                                            <div
                                                key={`artist-movie-${idx}`}
                                                onClick={() => goToPage(movie.id)}
                                                className="cursor-pointer"
                                            >
                                                <MovieCard movie={movie} />
                                            </div>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </>
                    )
                }

            </Stack >

        </div >
    )
}

export default SearchMovie;