import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'getReviewsBySpotId';
const POST_REVIEW = 'create/review'
const DELETE_REVIEW = 'delete/review'
const getReviews = (spotId, reviews) => {
  return {
    type: GET_REVIEWS,
    payload: { spotId, reviews }
  };
};

const actionDeleteReviews = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload:reviewId
  };
};

export const actionCreateReview = (spotId, reviewData) => {
    return { 
                type: POST_REVIEW, 
                payload: { spotId,  reviewData} 
            };
  };





  export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch(actionDeleteReviews(reviewId));
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false; 
    }
  };



  export const createReviewThunk = (spotId,reviewData) => async (dispatch) => {
    const {review,stars} = reviewData
    // console.log("the review form is " ,review)
  
    try {
    
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            review: review,
            stars: stars,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch( actionCreateReview(spotId,data));
          return data;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    
    }

    export const getReviewsThunk = (spotId) => async (dispatch) => {
      try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
          method: 'GET',
        });
    
        if (response.ok) {
          const data = await response.json();
          dispatch(getReviews(spotId, data));
          return data;
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };



const initialState ={spot:{},  user:{}}

export const reviewsReducer=(state=initialState ,action)=>{

    switch(action.type){
      case GET_REVIEWS: {
        const { spotId, reviews } = action.payload;
        const newState = { ...state, spot: {} };
        newState.spot[spotId] =  reviews ;
      
        return newState;
      }
      
      case POST_REVIEW: {
        const { spotId, newReview } = action.payload;

       
        const newState = { ...state };
        const targetSpot = newState.spot[spotId];
              if (targetSpot) {
          targetSpot.reviews = [...targetSpot.reviews, newReview];
        }
      
        return newState;
      }

      case DELETE_REVIEW:
        const { payload: reviewId } = action;
        const newState = {
          ...state,
          spot: { ...state.spot },
        };
  
        if (newState.spot[reviewId]) {
          delete newState.spot[reviewId];
        }
  
        if (newState.user[reviewId]) {
          delete newState.user[reviewId];
        }
  
        return newState;

        default:
            return state
    }
}


export default reviewsReducer