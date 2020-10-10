import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import getAllMovies from '../actions/getAllMovies';

export default function Landing() {
  const [allMovies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((res) => {
      const sorted = res.sort(
        (
          { releaseDate: releaseDateA = new Date() },
          { releaseDate: releaseDateB = new Date() },
        ) => new Date(releaseDateB) - new Date(releaseDateA),
      );
      setMovies(sorted);
    });
  }, []);
  return (
    <>
      <h1>Popular Movies</h1>
      <MovieList movies={allMovies} />
    </>
  );
}
