// import { csrfFetch } from "./csrf"
// const POST_REVIEW = 'create/review'

// export const actionCreateReview = (reviewData) => {
//     return { 
//                 type: POST_REVIEW, 
//                 payload: reviewData 
//             };
//   };



  // export const createReviewThunk = (spotId,reviewData) => async (dispatch) => {
  //   const {review,stars} = reviewData
  //   console.log("the review form is " ,review)
  
  //   try {
    
  //       const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           review: review,
  //           stars: stars,
  //         }),
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         dispatch( actionCreateReview (data));
  //         return data;
  //       }
  //     } catch (error) {
  //       console.error('An error occurred:', error);
  //     }
    
  //   }
//     const intitalState = {}
//     export const createReviewBySpotReducer=(state=intitalState,action)=>{

//     switch(action.type){
//         case POST_REVIEW:
//             const newState = {...state, review:{...action.payload}}
//             return newState
//         default:
//             return state
//     }
// }

// export default createReviewBySpotReducer;



  