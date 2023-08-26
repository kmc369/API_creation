import { csrfFetch } from "./csrf"

const GET_SPOTS = '/getAllSpots'

const getSpots = (spots)=>{
    return {
        type:GET_SPOTS,
        payload:spots
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


const initialState= {spots:[]}
export const landingReducer = (state=initialState, action)=>{

    switch(action.type){
        case GET_SPOTS:
            const newState={...state, spots:action.payload}
            return newState
        
            default:
                return state

    }
}

export default landingReducer

