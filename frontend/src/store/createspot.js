import { csrfFetch } from "./csrf"
const CREATE_SPOT = 'create/spot'

export const actionCreateSpot = (spot) => {
    return { type: CREATE_SPOT, 
                payload: spot 
            };
  };


  export const getAllSpotsThunk = (spot)=> async (dispatch) =>{
      const   {country,address,city,state,lat,long,text,title,price,livephoto1,livephoto2,livephoto3,livephoto4,livephoto5} = spot
    try{
    const response = await csrfFetch('api/spots',{
        method:'POST',
        body:{
            country,
            address,
            city,
            state,
            lat,
            long,
            text,
            title,
            price,
            livephoto1,
            livephoto2,
            livephoto3,
            livephoto4,
            livephoto5  
        }
    })

    if(response.ok){
        const data = await response.json()
        dispatch(actionCreateSpot(data))
        // console.log(data)
        return data
    }
    }catch(error){
        console.error("An error occurred:", error);
    }
}

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