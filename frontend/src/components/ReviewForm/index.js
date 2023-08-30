import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import * as ReviewActions from '../../store/createReview'
import {useParams } from 'react-router-dom'

function ReviewForm({ spotId, onCloseModal }) {
  const [review, setreview] = useState('');
  const [stars, setstars] = useState(0);
  const dispatch = useDispatch()
  
  
  
  
  
  
  const isSubmitDisabled = review.length < 10 || stars === 0;
  
  const handleSubmit =  (e) => {
    e.preventDefault();
   
    const reviewForm = {
      review,
      stars
      
    }
    
   
    dispatch(ReviewActions.createReviewThunk(spotId,reviewForm))
    onCloseModal();
  };

 

  return (
 
      <form className="review-form" onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={review}
        onChange={(e)=>setreview(e.target.value)}
      />
      <div className="stars">
        <label>Stars</label>
       <input value = {stars}
       type='number' 
       onChange={(e)=>setstars(e.target.value)}
       min={1} max={5}>
      
       </input>
      </div>
      <button
        className="submit-button"
        
        disabled={isSubmitDisabled}
      >
        Submit Your Review
      </button>
      </form>
  
  );
}

export default ReviewForm;