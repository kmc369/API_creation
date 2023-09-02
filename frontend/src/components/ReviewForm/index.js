import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux'
import * as ReviewActions from '../../store/reviews'
import {useParams } from 'react-router-dom'
import * as SpotActions from '../../store/spot'
import { useModal } from "../../context/Modal";
import './postReview.css'


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
  const error ={}

  if(review.length<10){
    error.review = "Must be greater than 30 character"
  }

  if(!stars){
    error.stars = "Must give a rating "
  }
  setErrors(error)
 },[review,stars])

  return (
 
      <form className="review-form" onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      <textarea
        className='reviewtextBox'
        placeholder="Leave your review here..."
        value={review}
        onChange={(e)=>setreview(e.target.value)}
      />
      {/* <p className='errors'>{errors.review}</p> */}
      <label>Stars</label>
      <div className="stars">
       <input value = {stars}
       type='number' 
       onChange={(e)=>setstars(parseInt(e.target.value))}
       min={1} max={5}>
      
       </input>
       
         
      </div>
      <button
       type='submit'
        className={`submit-button ${Object.keys(errors).length > 0 ? "disabled-button" : "enabled-button"}`}
        style={{ backgroundColor: Object.keys(errors).length > 0 ? 'rgb(187, 186, 186)' : ' #ff385c' }}
        disabled={isSubmitDisabled}
      >
        Submit Your Review
      </button>
      </form>
  
  );
}

export default ReviewForm;