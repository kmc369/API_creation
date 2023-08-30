import React, { useState } from 'react';

function ReviewForm({ onCloseModal }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const isSubmitDisabled = comment.length < 10 || rating === 0;

  const handleSubmit = () => {
  
    onCloseModal();
  };

  return (
    <div className="review-form">
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="rating">
        <label>Stars</label>
       <input type='number' min={1} max={5}></input>
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit Your Review
      </button>
    </div>
  );
}

export default ReviewForm;