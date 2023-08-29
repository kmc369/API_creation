import React, { useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as DetailActions from '../../store/details'
import { useParams } from 'react-router-dom'; 
import './SpotDetails.css';

export default function SpotDetails({match}) {
  const spotDetail = useSelector(state=>state.details.spot)
  const dispatch = useDispatch()

  const { spotId } = useParams() // Extract spotId from URL params
 
  useEffect(() => {
 
    dispatch(DetailActions.getSpotDetailsThunk(spotId)); // Pass spotId to action creator
  }, [dispatch, spotId]);

  if(Object.values(spotDetail).length===0 ){
  
    return null
  }

 


  return (
    <>
    <div className='spotDetails'>
      <h1>{ spotDetail.name}</h1>
      <p>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</p>
    </div>


    <div className='detailImages'>
      {spotDetail.SpotImages.map((element,index)=>(
        <img id={`s${index}`} src={element.url} alt="img"></img>
       
     

      ))} 
       </div>

    <p>Hosted By: {spotDetail.Owner.firstName},{spotDetail.Owner.lastName}</p>
    <p>description {spotDetail.description}</p>
    </>
  )
}


