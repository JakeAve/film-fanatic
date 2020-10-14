import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

export default function MovieList(props) {
  const { movies } = props;

  function movieDetails(movie) {
    const {
      title,
      fanaticRating,
      releaseDate,
      plots = [],
      _id,
      id,
      image: { url: imageURL },
    } = movie;
    return (
      <li key={_id}>
        <Link to={id} className="movie-list-link">
          <div className="text-content">
            <span className="title">{title}</span>
            <span className="release-date">
              {new Date(releaseDate).toLocaleDateString()}
            </span>
            <span className="fanatic-score">
              Fanatic Rating: {fanaticRating || 'N / A'}
            </span>
            <span className="plot">
              {plots.length ? plots[0]?.text || '' : ''}
            </span>
          </div>
          <div className="img-container">
            <LazyLoad height={200} offset={100}>
              <img src={imageURL} alt={title + ' Poster'} />
            </LazyLoad>
          </div>
        </Link>
      </li>
    );
  }
  return (
    <div className="movie-list">
      <ul>{movies.map(movieDetails)}</ul>
    </div>
  );
}
