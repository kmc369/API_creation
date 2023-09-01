import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from '../../store/spot'
import { useEffect } from 'react';
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useModal } from "../../context/Modal";
import OpenModalButton from '../OpenModalButton'
import { DeleteSpot } from '../DeleteSpot';
import { useState } from 'react';



export const ManageSpot = () => {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const userSpots = useSelector(state =>state.spots.allSpots)


const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


// console.log(userSpots)

const history= useHistory()

  useEffect(()=>{
    dispatch(SpotActions.getSpotByUserIdThunk())
  
},[dispatch])





if (userSpots.Spots === undefined || Object.values(userSpots).length === 0 || !userSpots) {
  return null;
}



  return (
    <>
        <h1>Manage Your Spots</h1>
         <button>Create a Spot</button>

        <div id='landingPageContainer'>
      
       
      {userSpots.Spots.map((element, index) => (
     
          <div className="spot" key={index}>
             
              <img src={element.previewImage} alt='image'></img>
            
              <p className='city-star'>{element.state}, {element.city} <i class="fa-solid fa-star"></i>{element.avgRating}</p> 
              <p>${element.price} night</p>
             <span> <button onClick={()=>history.push(`/spot/update/${element.id}`) }>update</button></span>
             <span> <OpenModalButton
              modalComponent={<DeleteSpot spotId={element.id}  onCloseModal={() => setIsDeleteModalOpen(false)} />}
        
              buttonText="Delete"
              
            /></span>

      </div>
      ))} 
   
   </div> 
    </>
  )
}

export default ManageSpot
