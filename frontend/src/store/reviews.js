import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'getReviewsBySpotId';
const POST_REVIEW = 'create/review'
const getReviews = (spotId, reviews) => {
  return {
    type: GET_REVIEWS,
    payload: { spotId, reviews }
  };
};

export const actionCreateReview = (spotId, reviewData) => {
    return { 
                type: POST_REVIEW, 
                payload: { spotId,  reviewData} 
            };
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
          method: 'GET'
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
        const newState = { ...state, spot: { ...state.spot } };
  
        newState.spot[spotId] = reviews;
  
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

        default:
            return state
    }
}


export default reviewsReducer