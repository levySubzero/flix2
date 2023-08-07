import React, { useEffect, useState } from 'react';
import { CategoryInterface, ItemInterface, MovieInterface, ShowInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import SeriesList from './SeriesList';
import SeriesCard from './SeriesCard';
import axios from 'axios';
import useSeries from '@/hooks/useFindSeries';
import useMovies from '@/hooks/useMovies';
import useShows from '@/hooks/useShows';

interface MVInteface {
  data: CategoryInterface
}

const MovieList: React.FC<MVInteface> = ({ data }) => {
  const { data: movies = [] } = useMovies(data.id);
  const { data: series = [] } = useShows(data.id);
  // const [series, setSeries] = useState<ShowInterface[]>([]);
  // const [movies, setMovies] = useState<MovieInterface[]>([]);
  const items = Array.from({ length: 5 }, (_, index) => index)

  // useEffect(() => {
  //   getMovies(data.id);
  //   getSeries(data.id);
  // }, []);

  // const getMovies = async (catId: string) => {
  //   try {
  //       const response = await axios.get(`/api/movies/category/${catId}`);
  //       setMovies(response.data);
  //       console.log(catId, movies);
  //       console.log(catId, response.data);
  //   } catch (error) {
  //       console.error('Error fetching data:', error);
  //   }
  // };

  // const getSeries = async (catId: string) => {
  //   try {
  //       const response = await axios.get(`/api/show/category/${catId}`);
  //       setSeries(response.data);
  //       console.log(catId, series);
  //   } catch (error) {
  //       console.error('Error fetching data:', error);
  //   }
  // };
  console.log(data.id);
  console.log('movies', movies);
  console.log('series', series);

  return (
    <div className="flex justify-center flex-col">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{data.name}</p>
      </div>
      <div className="flex mt-2">
        {series.length > 0 && items.map((item, i) => (
          <React.Fragment key={i}>
            {movies[i] && <MovieCard key={`movie-${movies[i].id}`} data={movies[i]} />}
            {series[i] && <SeriesCard key={`series-${series[i].id}`} data={series[i]} />}
          </React.Fragment>
        ))}

        {series.length === 0 && movies.map((movie: MovieInterface) => (
          <>
            <MovieCard key={movie.id} data={movie} />
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
