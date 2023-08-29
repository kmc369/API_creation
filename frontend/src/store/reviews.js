import { csrfFetch } from "./csrf"

const GET_REVIEWS = 'getReviewsBySpotId';

const getReviews =(spotId)=>{
    return {
        type:GET_REVIEWS,
        payload:spotId
    }
}

export const getReviewsThunk=(spotId) => async(dispatch,getState)=>{
    try{
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
            method:'GET'
        })
    
        if(response.ok){
            const data = await response.json()
            dispatch(getReviews(data))
            return data
        }

    }catch(error){
        console.error("An error occurred:", error);
}
}



const intitalState = {Review: []}

export const getReviewsReducer=(state=intitalState,action)=>{

    switch(action.type){
        case GET_REVIEWS:
            const newState = {...state,Reviews:action.payload}
            return newState
        default:
            return state
    }
}


export default getReviewsReducer