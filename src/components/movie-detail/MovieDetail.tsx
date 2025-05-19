import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Box, Stack, Chip } from '@mui/material';
import YouTube from 'react-youtube';
import MovieCard from '@/shared-components/movie-cards/MovieCard';
import { ICast } from '@/interfaces/IMovieData';
import { IMovie } from '@/interfaces/IMovie';

interface IMovieDetail {
    cast: ICast[]
    movie: IMovie
    trailerKey: string | null
    similarMovies: IMovie[]
}

const MovieDetail: React.FC<IMovieDetail> = (props) => {

    const { cast, movie, trailerKey, similarMovies } = props;

    const router = useRouter();

    const goToPage = (id: number) => {
        router.push(`/movie/${id}`);
    };

    return (
        <Box className="p-6 max-w-screen-xl mx-auto">
            <Typography variant="h3" className="font-bold text-blue-900 mb-4">{movie.title}</Typography>
            <Typography variant="body1" className="mb-3 text-blue-600">{movie.overview}</Typography>

            <Stack direction="row" spacing={1} className="mb-4 mt-2 flex-wrap items-center">
                <Typography variant="body1" className="mb-3 text-blue-600">Genres: </Typography>

                {movie?.genres?.map((genre) => (
                    <Chip label={genre?.name} key={genre?.id} color="primary" />
                ))}
            </Stack>

            {trailerKey && (
                <div className="mb-6">
                    <Typography variant="h5" className="mb-2">Trailer</Typography>
                    <YouTube videoId={trailerKey} opts={{ width: '100%', height: '400' }} />
                </div>
            )}

            <div className="mb-6">
                <Typography variant="h5" className="mb-4">Cast</Typography>
                <Stack direction="row" spacing={2}>
                    {cast.map((member) => (
                        <div key={member?.id} className="text-center">
                            {member.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                    alt={member.name}
                                    className="w-[100px] h-[150px] object-cover rounded"
                                />
                            ) : (
                                <div className="w-[100px] h-[150px] bg-gray-300 rounded" />
                            )}
                            <Typography className="text-sm mt-1">{member.name}</Typography>
                            <Typography className="text-xs text-gray-600">{member.character}</Typography>
                        </div>
                    ))}
                </Stack>
            </div>

            <div>
                <Typography variant="h5" className="mb-4">Similar Movies</Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        similarMovies.map((m, index) => (
                            <div
                                key={`similar-movie-${index}`}
                                onClick={() => goToPage(m.id)}
                                className="cursor-pointer"
                            >
                                <MovieCard key={`${index}similar movies`} movie={m} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Box>
    )
}

export default MovieDetail