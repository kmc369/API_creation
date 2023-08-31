import { csrfFetch } from "./csrf"
const CREATE_SPOT = 'create/spot'
const GET_SPOT_BY_ID = 'get/SpotByUserId'
const UPDATE_SPOT = 'update/spot'
const DELETE_SPOT = '/Delete/Spot'
const GET_SPOTS = '/getAllSpots'
const GET_SPOT_DETAILS = 'getSpotDetails'
const POST_IMAGE = 'postImageForSpot'
export const actionCreateSpot = (spot) => {
    return { 
            type: CREATE_SPOT, 
                payload: spot 
            };
  };

  export const actionGetSpotByUserId = (userId) => {
    return { 
            type: GET_SPOT_BY_ID, 
                payload: userId
            };
  };


  export const actionUpdateSpot = (spot) => {
    return { 
            type: GET_SPOT_BY_ID, 
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

const actionPostImage = (spotId)=>{
  return{
      type:POST_IMAGE,
      payload:spotId
  }
}
  

export const postSpotImageThunk = (spotId, imageObj) => async (dispatch, getState) => {
  const { id, url } = imageObj;
  // console.log(imageObj)
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
        dispatch( actionPostImage(data, id));
        return data;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};




export const getSpotDetailsThunk=(spotId) => async(dispatch,getState)=>{
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
      console.error('An error occurred:', error.message);
    }
  };
  
  export const getSpotByUserIdThunk = (spotId) => async (dispatch) => {
 
    
    try {
      
      const response = await csrfFetch("/api/spots/current", {
        method: 'GET',
        
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
        case GET_SPOT_BY_ID:{
          const newState={...state,spots:[action.payload]}
          return newState
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
        case POST_IMAGE:
          const newState = {...state, image:{...action.payload}}
          return newState
            default:
                return state

    
    }

}

