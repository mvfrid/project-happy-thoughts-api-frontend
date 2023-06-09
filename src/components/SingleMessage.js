/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { formatDistance } from 'date-fns';

const SingleMessage = ({ singleMessage, fetchPosts }) => {
  const [liked, setLiked] = useState(false); // Initial state false

  // We calculate the time since the message was posted (date-fns)
  const timeSincePosted = formatDistance(new Date(singleMessage.createdAt), new Date(), { addSuffix: true });

  // This function posts a like (patch - update) to the API and updates the message list through fetchPosts
  const onLikeIncrease = () => {
    const options = {
      method: 'PATCH'
    }

    // eslint-disable-next-line no-underscore-dangle
    fetch(`https://project-happy-thoughts-api-xac4iwz3fa-lz.a.run.app/thoughts/${singleMessage._id}/like`, options)
      .then((response) => response.json())
      .then(() => {
        setLiked(true) // We set the state liked to true, giving it a different color
        fetchPosts(); // We call the fetchPost function in the grandparent, fetching from the API, rendering an update in messageList.
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className="message">
      <p key={singleMessage._id}>{singleMessage.message}</p>
      <div className="info-wrapper">
        <div className="info-like">
          <button type="button" id="likeBtn" onClick={onLikeIncrease} className={liked ? 'like-button liked' : 'like-button'}>
            <span className="emoji" aria-label="like button">❤️</span>
          </button>
          <span className="num-likes">x{singleMessage.heart}</span>
        </div>
        <div className="info-time">{timeSincePosted}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
