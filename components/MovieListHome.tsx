import React, { useEffect, useState } from 'react';
import { CategoryInterface, ItemInterface, MovieInterface, ShowInterface } from '@/types';
import MovieCard from '@/components/MovieCard';
import SeriesList from './SeriesList';
import SeriesCard from './SeriesCard';
import axios from 'axios';

interface MVInteface {
  data: CategoryInterface
}

const MovieList: React.FC<MVInteface> = ({ data }) => {
  const [series, setSeries] = useState<ShowInterface[]>([]);
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const items = Array.from({ length: 5 }, (_, index) => index)

  useEffect(() => {
    getMovies(data.id);
    getSeries(data.id);
  }, []);

  const getMovies = async (catId: string) => {
    try {
        const response = await axios.get(`/api/movies/category/${catId}`);
        setMovies(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const getSeries = async (catId: string) => {
    try {
        const response = await axios.get(`/api/show/category/${catId}`);
        setSeries(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="flex justify-center flex-col py-16">
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

        {series.length === 0 && movies.map((movie) => (
          <>
            <MovieCard key={movie.id} data={movie} />
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
