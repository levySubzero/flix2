export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  subGenres: string
  trailerUrl: string
  cast: string
  shortDesc: string
  year: string;
}

export interface SeriesInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  episodes: string[];
  year: string;
  cast: string;
  trailerUrl: string;
}

export interface ShowInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  seasons: string[];
  year: string;
  cast: string;
  trailerUrl: string;
  subGenres: string;
  shortDesc: string;
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
