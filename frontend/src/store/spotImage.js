import { create } from "@mui/material/styles/createTransitions"
import { csrfFetch } from "./csrf"

const POST_IMAGE = 'postImageForSpot'

const postImage = (spotId)=>{
    return{
        type:POST_IMAGE,
        payload:spotId
    }
}

export const postSpotImageThunk = (spotId, imageObj) => async (dispatch, getState) => {
    const { id, url } = imageObj;
    console.log(imageObj)
    if (url) {
      try {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: url,
            preview: false,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(postImage(data, id));
          return data;
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };
  

const intitalState = {}

export const createSpotImagetReducer=(state=intitalState,action)=>{

    switch(action.type){
        case POST_IMAGE:
            const newState = {...state, image:{...action.payload}}
            return newState
        default:
            return state
    }
}

export default createSpotImagetReducer
