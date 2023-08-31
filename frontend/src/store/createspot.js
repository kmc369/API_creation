import { csrfFetch } from "./csrf"
const CREATE_SPOT = 'create/spot'
const GET_SPOT_BY_ID = 'get/SpotByUserId'
const UPDATE_SPOT = 'update/spot'
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

  




  export const createSpotThunk = (spot) => async (dispatch) => {
    const {
      address,
      city,
      country,
      description,
      latitude,
      longitude,
      price,
      spotTitle,
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
            name:spotTitle,
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

  export const updateSpotThunk= (spot,spotId) => async (dispatch) => {
    
    const {
      address,
      city,
      country,
      description,
      latitude,
      longitude,
      price,
      spotTitle,
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
            name:spotTitle,
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
  
  
const initialState ={}
export const createSpotReducer = (state=initialState,action)=>{

    switch(action.type){
        case CREATE_SPOT:{
            const newState={...state, spot:{...action.payload}}
            return newState
        }
        case GET_SPOT_BY_ID:{
          const newState={...state,spots:[action.payload]}
          return newState
        }
        case UPDATE_SPOT :{
          const newState={...state, spot:{...action.payload}}
          return newState
        }
            default:
                return state

    
    }

}

export default createSpotReducer