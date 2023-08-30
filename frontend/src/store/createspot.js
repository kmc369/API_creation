import { csrfFetch } from "./csrf"
const CREATE_SPOT = 'create/spot'

export const actionCreateSpot = (spot) => {
    return { 
            type: CREATE_SPOT, 
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

    console.log(spot)
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
          // livephoto1,
          // livephoto2,
          // livephoto3,
          // livephoto4,
          // livephoto5
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("reponse from the thunk", data)
        dispatch(actionCreateSpot(data));
        return data;
      } 
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };
const initialState ={}
export const createSpotReducer = (state=initialState,action)=>{

    switch(action.type){
        case CREATE_SPOT:
            const newState={...state, spot:{...action.payload}}
            return newState
        
            default:
                return state

    
    }

}