import { csrfFetch } from "./csrf"
const CREATE_SPOT = 'create/spot'
const GET_SPOTS_BY_USER_ID = 'get/SpotByUserId'
const UPDATE_SPOT = 'update/spot'
const DELETE_SPOT = '/Delete/Spot'
const GET_SPOTS = '/getAllSpots'
const GET_SPOT_DETAILS = 'getSpotDetails'
const POST_IMAGE = 'postImageForSpot'
const DELETE_IMAGES = 'delete/Images'
export const actionCreateSpot = (spot) => {
    return { 
            type: CREATE_SPOT, 
                payload: spot 
            };
  };

  export const actionGetSpotByUserId = (spots) => {
    return { 
      type: GET_SPOTS_BY_USER_ID, 
      payload: spots
    };
  };


  export const actionUpdateSpot = (spot) => {
    return { 
            type: UPDATE_SPOT, 
                payload: spot
            };
  };

  export const actionDeleteSpot = (spotId) => {
    return { 
            type: DELETE_SPOT, 
                payload: spotId
            };
  };

  const getSpots = (spots)=>{
    return {
        type:GET_SPOTS,
        payload:spots
    }
}

const actionGetSpotDetails = (id)=>{
  return{
      type:GET_SPOT_DETAILS,
      payload:id
  }
}

const actionPostImage = (spotId, imgData) => {
  return {
    type: POST_IMAGE,
    payload: { spotId, imgData }
  };
};

export const actionDeleteImages = (spotId, imageId) => {
  return { 
    type: DELETE_IMAGES, 
    payload: { spotId, imageId }
  };
};

  

export const postSpotImageThunk = (spotId, imageObj) => async (dispatch, getState) => {
 const {url,preview} = imageObj
  // console.log(imageObj)

    try {
      const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          preview: preview,
        }),
      });

      if (response.ok) {
        const data = await response.json();
       
        dispatch(actionPostImage(spotId, data));
        return data;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  
};




export const getSpotDetailsThunk=(spotId) => async(dispatch,getState)=>{
  // console.log("thunk spot id is ", spotId)

  try{
      const response = await csrfFetch(`/api/spots/${spotId}`,{
          method:'GET'
      })
  
      if(response.ok){
          const data = await response.json()
        
          dispatch(actionGetSpotDetails(data))
          return data
      }

  }catch(error){
      console.error("An error occurred:", error);
}
}


export const getAllSpotsThunk = ()=> async (dispatch) =>{
  try{
  const response = await csrfFetch('api/spots',{
      method:'GET'
  })

  if(response.ok){
      const data = await response.json()
      dispatch(getSpots(data))
      // console.log(data)
      return data
  }
  }catch(error){
      console.error("An error occurred:", error);
  }
}


  export const createSpotThunk = (spot) => async (dispatch) => {
    const {
      address,
      city,
      country,
      description,
      latitude,
      longitude,
      price,
      name,
      state,
    
     
     
    } = spot;

    
    try {
      
      const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            address:address,
            city:city,
            state:state,
            country:country,
            lat:latitude,
            lng:longitude,
            name:name,
            description:description,
            price:price,
          
        
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log("reponse from the thunk", data)
        dispatch(actionCreateSpot(data));
        return data;
      } 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  export const getSpotByUserIdThunk = (spotId) => async (dispatch) => {
 
    
    try {
      
      const response = await csrfFetch("/api/spots/current", {
        method: 'GET',
        
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(actionGetSpotByUserId(data));
        return data;
      } 
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };


  export const deleteSpotThunk = (spotId) => async (dispatch) => {
 
    
    try {
      
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log("reponse from the thunk", data)
        dispatch(actionDeleteSpot(data));
        return data;
      } 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };




  export const updateSpotThunk= (spot,spotId) => async (dispatch) => {
    
    const {
      address,
      city,
      country,
      description,
      latitude,
      longitude,
      price,
      name,
      state,
    
     
     
    } = spot;
    
    try {
      
      const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            address:address,
            city:city,
            state:state,
            country:country,
            lat:latitude,
            lng:longitude,
            name:name,
            description:description,
            price:price,
         
        
        }),
      
        
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log("reponse from the thunk", data)
        dispatch(actionGetSpotByUserId(data));
        return data;
      } 
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };



  export const deleteSpotImageThunk = (spotId, imageId) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spot-images/${imageId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(actionDeleteImages(spotId, imageId));
        return data;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  
const initialState ={allSpots:{},  spotDetails:{}}
export default function spotReducer(state=initialState,action){

    switch(action.type){
        case GET_SPOTS:{
          const newState= {...state,allSpots:{}}
          action.payload.Spots.forEach((element)=>{
            newState.allSpots[element.id]=element
          })
          return newState
        }
        case CREATE_SPOT:{
            const newState={...state, allSpots:{...state.allSpots}}
            newState.allSpots[action.payload.id] = action.payload;

            return newState
        }



        case GET_SPOTS_BY_USER_ID: {
          const newState = { ...state, allSpots: action.payload };
          return newState;
        }




        case UPDATE_SPOT: {
          const updatedSpot = action.payload;
          const newState = {
            ...state,
            allSpots: {
              ...state.allSpots,
              [updatedSpot.id]: updatedSpot,
            },
          };
          return newState;
        }
        
        case DELETE_SPOT: {
          const newState = {...state, allSpots: { ...state.allSpots }, spotDetails: {},
          };
          delete newState.allSpots[action.id];
          return newState;
        }
        case GET_SPOT_DETAILS: {
          const spotDetails = action.payload; 
          const newState = {
            ...state,
            spotDetails: spotDetails,
          };
          return newState;
        }
        case POST_IMAGE: {
          const { spotId, imgData } = action.payload;
          const newState = { ...state, spotDetails: { ...state.spotDetails } };
        
          
          const spotToUpdate = newState.spotDetails[spotId];
        
          if (spotToUpdate) {
            spotToUpdate.SpotImages = [...spotToUpdate.SpotImages, imgData];
          }
        
          return newState;
        }
        
        case DELETE_IMAGES: {
          const { spotId, imageId } = action.payload;
          const newState = { ...state, allSpots: { ...state.allSpots } };
    
          const spotToUpdate = newState.allSpots[spotId];
    
          if (spotToUpdate) {
            // Create a new array without the image with the specified imageId
            spotToUpdate.SpotImages = spotToUpdate.SpotImages.filter((img) => img.id !== imageId);
          }
    
          return newState;
        }
            default:
                return state

    
    }

}

