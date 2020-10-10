import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import getMovie from '../actions/getMovie';
import MovieDetails from '../components/MovieDetails';

export default function Movie() {
  const [props, setProps] = useState();
  const url = useRouteMatch('/:title/:tconst');

  useEffect(() => {
    const {
      params: { title, tconst },
    } = url;
    getMovie(`/${title}/${tconst}/`).then((res) => setProps(res));
  }, [url]);
  if (props) return <MovieDetails {...props} />;
  else return <></>;
}
