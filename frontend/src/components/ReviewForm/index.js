import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import * as ReviewActions from '../../store/reviews'
import {useParams } from 'react-router-dom'
import * as SpotActions from '../../store/spot'
import { useModal } from "../../context/Modal";



function ReviewForm({ spotId, onCloseModal }) {
  const [review, setreview] = useState('');
  const [stars, setstars] = useState(0);
  const dispatch = useDispatch()
  const {closeModal} = useModal()
  const [errors, setErrors] = useState({});

  
  
  const reviewDetails = useSelector((state) => state.reviews.spot);
  
  
  
  const isSubmitDisabled = review.length < 10 || stars === 0;
  
  const handleSubmit =  async(e) => {
    e.preventDefault();
   
    const reviewForm = {
      review,
      stars
      
    }
    
   
    await dispatch(ReviewActions.createReviewThunk(spotId,reviewForm))
  
    setreview(" ")
    setstars(0)
    closeModal();

    await dispatch(SpotActions.getSpotDetailsThunk(spotId))
    await dispatch(ReviewActions.getReviewsThunk(spotId))
  };

 useEffect(()=>{

 })

  return (
 
      <form className="review-form" onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={review}
        onChange={(e)=>setreview(e.target.value)}
      />
      <div className="stars">
       <input value = {stars}
       type='number' 
       onChange={(e)=>setstars(parseInt(e.target.value))}
       min={1} max={5}>
      
       </input>
         <label>Stars</label>
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