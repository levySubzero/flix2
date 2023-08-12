export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  subGenres: string;
  trailerUrl: string;
  cast: string;
  shortDesc: string;
  year: string;
  genreId: string;
  categoryId: string;
}

export interface SeriesInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  episodes: EpisodeInterface[];
  year: string;
  cast: string;
  trailerUrl: string;
  showId: string;
}

export interface ShowInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  year: string;
  subGenres: string;
  cast: string;
  trailerUrl: string;
  shortDesc: string;
  genreId: string;
  categoryId: string;
}


export interface EpisodeInterface {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  seriesId: string;
}

export interface CategoryInterface {
  id: string;
  name: string;
  home: boolean;
  movieIds: string[];
}

export interface ItemInterface  {
  title: string;
  shows: ShowInterface[];
  movies: MovieInterface[];
}

export interface PropInterface {
  categories: ItemInterface[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  otp_enabled: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  user: IUser;
}
