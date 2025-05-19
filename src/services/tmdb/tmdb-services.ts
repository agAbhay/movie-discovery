import { ParamValue } from "next/dist/server/request/params";
import { tmdbAxios } from "../interceptor";


export async function getNowPlayingMovieList() {
    const response = await tmdbAxios.get(`movie/popular`)
    return response;
}



export async function getMovieByGenre(genreIds: number[]) {
    const response = await tmdbAxios.get(`discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreIds.join(',')}`)
    return response;
}



export async function searchMovieByActorOrTitle(searchedKeys: string[]) {
    const response = await tmdbAxios.get(`search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchedKeys.join('+')}`)
    return response;
}


export async function getMovieById(movieId: ParamValue) {
    const response = await tmdbAxios.get(`movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}}`)
    return response;
}

export async function getMovieCreditsById(movieId: ParamValue) {
    const response = await tmdbAxios.get(`movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}}`)
    return response;
}

export async function getMovieVideoById(movieId: ParamValue) {
    const response = await tmdbAxios.get(`movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}}`)
    return response;
}

export async function getSimilarMovieById(movieId: ParamValue) {
    const response = await tmdbAxios.get(`movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}}`)
    return response;
}