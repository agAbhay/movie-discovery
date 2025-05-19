import { IMovie } from "./IMovie"

export interface IMovieData {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
}


export interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface IVideo {
  key: string;
  type: string;
  site: string;
}
