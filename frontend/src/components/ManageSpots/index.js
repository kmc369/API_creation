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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './manageSpot.css'

export const ManageSpot = () => {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const userSpots = useSelector(state =>state.spots.allSpots)


const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


const history= useHistory()

  useEffect(()=>{
    dispatch(SpotActions.getSpotByUserIdThunk())
  
},[dispatch])


const handleUpdateSpot = async (spotId) =>{
  const Spot = await dispatch(SpotActions.getSpotDetailsThunk(spotId))

  history.push(`/spot/update/${Spot.id}`)

  
}


if (userSpots.Spots === undefined || Object.values(userSpots).length === 0 || !userSpots) {
  return null;
}



  return (
    <>
      <div className='manageSpot-entire-container'>


      <div className='headerStuff'>
        <div className='headerSpot'>
        <h1>Manage Your Spots</h1>
        </div>
      
      <div>
        <button className='createSpot' onClick={()=> history.push('/spots')}>Create a Spot</button>
      </div>

      </div>


        <div className='managAllContainer' >
      
       
      {userSpots.Spots.map((element, index) => (
     
          <div className="spot" key={index} >
             
              <img src={element.previewImage} alt='image' onClick={()=>{history.push(`/spots/${element.id}`)}}></img>
            
              <p className='city-star' onClick={()=>{history.push(`/spots/${element.id}`)}}>{element.state}, {element.city} <i class="fa-solid fa-star"></i>{element.avgRating}</p> 
              <p>${element.price} night</p>




              <div>
             <span> <button style={{backgroundColor:'#ff385c',border:'none',color:'white',height:'30px',width:'100px',borderRadius:'3px'}}  onClick={()=>handleUpdateSpot(element.id)}>update</button></span>
             <span> <OpenModalButton 
              modalComponent={<DeleteSpot spotId={element.id}  onCloseModal={() => setIsDeleteModalOpen(false)} />}
              
              buttonText="Delete"
              
              /></span>
            </div>
              </div>

      ))} 
   
   </div> 
   </div>
    </>
  )
}

export default ManageSpot
