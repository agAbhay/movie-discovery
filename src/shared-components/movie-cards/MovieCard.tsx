import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { IMovie } from '@/interfaces/IMovie';
import { Stack, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MuiButton from '../Button';

interface IMovieCard {
    movie: IMovie
    key?: string
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ratingDivClassName = '!text-sm !font-bold !flex !flex-row !gap-0.5 !items-center';


const MovieCard: React.FC<IMovieCard> = (props) => {

    const { movie, key } = props;

    return (
        <Card sx={{ width: '100%', maxWidth: 250 }} key={key} className='!rounded-2xl !shadow-lg hover:!shadow-xl !transition-shadow !duration-300 bg-white'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={`${IMAGE_BASE_URL}/${movie.poster_path}`}
                    alt={movie.original_title}
                    className={'h-[250] w-full !object-fill '}
                />
                <CardContent className='!px-3 !pt-3 !pb-1'>
                    <Typography gutterBottom component="div" className='!text-md !font-bold !leading-[1.3] line-clamp-1'>
                        {movie.original_title}
                    </Typography>

                    <Stack direction={'row'} className='justify-between'>

                        <Tooltip title={`Released on: ${movie.release_date}`} arrow placement="top">
                            <Typography gutterBottom component="div" className={ratingDivClassName}>
                                {movie.release_date}
                            </Typography>
                        </Tooltip>

                        <Typography gutterBottom component="div" className={ratingDivClassName}>
                            <StarIcon className='text-yellow-500 fot' />
                            {movie.vote_average}
                        </Typography>
                    </Stack>

                    <Tooltip title={movie.overview} arrow placement="bottom">
                        <Typography
                            variant="body2"
                            className={`!text-xs line-clamp-3 ${!movie.overview ? 'h-[48px]': ''}`}
                        >
                            {movie.overview || 'Overview or detail is not available for this movie'}
                        </Typography>
                    </Tooltip>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <MuiButton
                    onClick={() => { }}
                    label='Add to watch later'
                />


            </CardActions>
        </Card>
    )
}

export default MovieCard