import React, { useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as DetailActions from '../../store/details'
import * as ReviewAction from '../../store/reviews'
import { useParams } from 'react-router-dom'; 
import './SpotDetails.css';

export default function SpotDetails() {
  const spotDetail = useSelector(state=>state.details.spot)
  const reviewDetails = useSelector(state=>state.reviews.Reviews)
  const dispatch = useDispatch()

  const { spotId } = useParams() // Extract spotId from URL params
 
  useEffect(() => {
 
    dispatch(DetailActions.getSpotDetailsThunk(spotId)); // Pass spotId to action creator
    dispatch(ReviewAction.getReviewsThunk(spotId))
  }, [dispatch, spotId]);

  if(Object.values(spotDetail).length===0 ){
  
    return null
  }

  // console.log("the review Details are " ,reviewDetails)


 function formatReviewCount(count) {
  if(count ===0){
    return "New"
  }
  if (count === 1) {
    return '· 1 Review';
  } else {
    return `· ${count} Reviews`;
  }
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
    <p>Description: {spotDetail.description}</p>

  <div className='callout-container'>
    <div className='callout'>
      <p className='calloutPrice'>{spotDetail.price} night <i class="fa-solid fa-star"></i>{spotDetail.avgStarRating}  {formatReviewCount(spotDetail.numReviews)} </p>
      <button className='reserve' onClick={()=> alert("feature coming soon")}>Reserve</button>
    </div>
    </div>

    <div className='reviewsContainer'>
    <h1><i class="fa-solid fa-star"></i>{spotDetail.avgStarRating}  {formatReviewCount(spotDetail.numReviews)}</h1>
        
    </div>
    </>
  )
}


