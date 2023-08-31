import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as SpotsActions from '../../store/createspot'
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export const ManageSpot = () => {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const userSpots = useSelector(state =>state.create.spots)
const imgs = useSelector(state=>state.spotImage.image)


// console.log("the id is ",user.id)
console.log("the user spots are ", userSpots)
console.log(imgs)
const history= useHistory()

  useEffect(()=>{
    dispatch(SpotsActions.getSpotByUserIdThunk(user.id))
},[dispatch,user.id])


if (!userSpots || userSpots.length === 0 || !userSpots[0].Spots || userSpots[0].Spots.length === 0) {
  console.log("I am returning null");
  return null;
}


  return (
    <>
        <h1>Manage Your Spots</h1>
        <button>Create a Spot</button>

        <div id='landingPageContainer'>
      
       
      {userSpots[0].Spots.map((element, index) => (
     
          <div className="spot" key={index}>
             
              <img src={element.previewImage} alt='image'></img>
            
              <p className='city-star'>{element.state}, {element.city} <i class="fa-solid fa-star"></i>{element.avgRating}</p> 
              <p>${element.price} night</p>
             <span> <button onClick={()=>history.push(`/spot/update/${element.id}`) }>update</button></span>
             <span> <button>Delete</button></span>

      </div>
      ))} 
   
   </div>
    </>
  )
}

export default ManageSpot
