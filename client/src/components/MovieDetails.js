import React from 'react';

export default function MovieDetails(props) {
  const {
    title,
    plots = [],
    genres = [],
    fanaticRating,
    releaseDate,
    image = {},
  } = props;
  const { url: imgURL } = image;

  return (
    <div className="movie-details">
      <div className="overview">
        <h1 className="title">{title}</h1>
        <span>{new Date(releaseDate).toLocaleDateString()}</span>
        <span className="plot">{plots.length ? plots[0]?.text || '' : ''}</span>
        <span className="rating">
          Fanatic Rating: {fanaticRating || 'N / A'}
        </span>
        <span className="genres">{genres.join(', ')}</span>
      </div>
      <img src={imgURL} alt={title + ' poster'} />
    </div>
  );
}
