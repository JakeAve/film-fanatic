import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import newComment from '../actions/newComment';

export default function NewComment(props) {
  const { loggedIn, onComment } = props;
  const [formValue, setFormValues] = useState({ fanaticRating: 5, text: '' });
  const url = useRouteMatch('/:title/:tconst');
  function onChange(e) {
    setFormValues({ ...formValue, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    const { givenName, imageUrl, googleId } = loggedIn;
    const data = {
      userId: googleId,
      name: givenName,
      avatar: imageUrl,
      ...formValue,
    };
    const {
      params: { title, tconst },
    } = url;
    newComment(`/${title}/${tconst}/`, data)
      .then((res) => {
        onComment(res);
      })
      .catch(() => window.alert('Could not send comment'));
  }
  return (
    <>
      <h2>Add your Rating</h2>
      <form className="new-comment" onSubmit={onSubmit}>
        <label>
          Fanatic Rating
          <span className="fanatic-rating">{formValue.fanaticRating}</span>
          <input
            name="fanaticRating"
            type="range"
            min="0"
            max="12"
            step="1"
            value={formValue.fanaticRating}
            onChange={onChange}
          />
        </label>
        <label>
          Comment
          <textarea
            name="text"
            placeholder="Comments"
            onChange={onChange}
          ></textarea>
        </label>
        <button disabled={!loggedIn}>
          {loggedIn ? 'Rate' : 'Login with Google to Rate'}
        </button>
      </form>
    </>
  );
}
