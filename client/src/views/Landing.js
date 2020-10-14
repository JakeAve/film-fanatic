import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import getAllMovies from '../actions/getAllMovies';

const landingMoviesKey = 'landingMovies';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default function Landing() {
  // Using local storage to speed things up. Might not be a big deal because the response will normally get cached anyway.
  const [allMovies, setMovies] = useLocalStorage(landingMoviesKey, []);

  function sortAndSetMovies(arr) {
    const sorted = arr.sort(
      (
        { releaseDate: releaseDateA = new Date() },
        { releaseDate: releaseDateB = new Date() },
      ) => new Date(releaseDateB) - new Date(releaseDateA),
    );
    setMovies(sorted);
  }

  useEffect(() => {
    getAllMovies().then((res) => sortAndSetMovies(res));
  });

  return (
    <>
      <h1>Popular Movies</h1>
      <MovieList movies={allMovies} />
    </>
  );
}
