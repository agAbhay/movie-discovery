import { tmdbAxios } from "../interceptor";


export async function getNowPlayingMovieList() {
    const response = await tmdbAxios.get(`movie/popular`)
    return response;
}



export async function getMovieByGenre(genreIds: number[]) {
    const response = await tmdbAxios.get(`discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreIds.join(',')}`)
    return response;
}



