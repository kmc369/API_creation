import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as ReviewActions from '../../store/reviews'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useModal } from "../../context/Modal";


export const DeleteReview = ({reviewId,spotId}) => {
    // console.log("review id =",reviewId)
    // console.log("spotId is ",spotId)
    const dispatch = useDispatch()
    const userReviews = useSelector(state =>state.reviews.user)


    const {closeModal} = useModal()
    const handleDelete = async (e) => {
  
       await dispatch(ReviewActions.deleteReviewThunk(reviewId));
        closeModal()
       await  dispatch(ReviewActions.getReviewsThunk(spotId))
      };
    
  return (
    <div>DeleteReview
       <div className="delete-Review">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this Review from the listing?</p>
      <button type='submit' onClick={handleDelete} >Yes, Delete Review</button>
      <button onClick={closeModal}>No, Keep Review</button>
    </div>
    </div>
  )
}

export default DeleteReview