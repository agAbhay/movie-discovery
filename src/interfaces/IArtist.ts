import { IMovie } from "./IMovie";

export interface IArtist {
  adult: boolean;
  gender: number;
  id: number;
  known_for: IMovie[];
  known_for_department: string;
  media_type: 'person' | 'movie';
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}
