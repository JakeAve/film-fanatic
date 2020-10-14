import React from 'react';

export default function Comments(props) {
  const { comments = [] } = props;

  function comment(cObj, i) {
    const { avatar = '', text, name, date, fanaticRating } = cObj;
    return (
      <li key={i} className="comment-container">
        <div className="comment-meta">
          <img className="comment-avatar" alt={name + ' avatar'} src={avatar} />
          <span className="comment-name">{name}</span>
          <span className="comment-date">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <div className="fanatic-rating">{fanaticRating}</div>
        <p className="comment-text">{text}</p>
      </li>
    );
  }
  return (
    <section>
      <h2>Comments</h2>
      <ul className="comments">{comments.map((c, i) => comment(c, i))}</ul>
    </section>
  );
}
