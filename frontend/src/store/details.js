import { csrfFetch } from "./csrf"


// const GET_SPOT_DETAILS = 'getSpotDetails'

// const getSpotDetails = (id)=>{
//     return{
//         type:GET_SPOT_DETAILS,
//         payload:id
//     }
// }

// export const getSpotDetailsThunk=(spotId) => async(dispatch,getState)=>{
//     try{
//         const response = await csrfFetch(`/api/spots/${spotId}`,{
//             method:'GET'
//         })
    
//         if(response.ok){
//             const data = await response.json()
//             dispatch(getSpotDetails(data))
//             return data
//         }

//     }catch(error){
//         console.error("An error occurred:", error);
// }
// }


// const intitalState={spot:{}}

// export const getDetailReducer=(state=intitalState,action)=>{

//     switch(action.type){
//         case GET_SPOT_DETAILS:
//             const newState = {...state,spot:action.payload}
//             return newState
//         default:
//             return state
//     }
// }

// export default getDetailReducer