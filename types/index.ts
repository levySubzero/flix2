export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genre: string;
  year: string;
}

export interface SeriesInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  episodes: string[];
  genre: string;
  year: string;
}

export interface EpisodeInterface {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
}
