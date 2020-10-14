import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import getMovie from '../actions/getMovie';
import MovieDetails from '../components/MovieDetails';
import Comments from '../components/Comments';
import NewComment from '../components/NewComment';

export default function Movie(props) {
  const { loggedIn } = props;
  const [movieData, setMovieData] = useState();
  const url = useRouteMatch('/:title/:tconst');

  function getData() {
    const {
      params: { title, tconst },
    } = url;
    let isMounted = true;
    getMovie(`/${title}/${tconst}/`).then((res) => {
      if (isMounted) setMovieData(res);
      return () => (isMounted = false);
    });
  }

  function onComment(data) {
    setMovieData(data);
  }

  useEffect(getData, []);
  if (movieData)
    return (
      <>
        <MovieDetails {...movieData} />
        {movieData.comments.find(
          (comment) => comment?.userId === loggedIn?.googleId,
        ) ? (
          ''
        ) : (
          <NewComment loggedIn={loggedIn} onComment={onComment} />
        )}
        <Comments {...movieData} />
      </>
    );
  else
    return (
      <>
        <p>Loading...</p>
      </>
    );
}
