import React, { useEffect, useState} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as SpotActions from '../../store/spot'
import * as ReviewAction from '../../store/reviews'
import { useParams } from 'react-router-dom'; 
import * as sessionActions from "../../store/session";
import ReviewForm from '../ReviewForm';
import { useModal } from "../../context/Modal";
import './SpotDetails.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'

export default function SpotDetails() {
  const spotDetail = useSelector(state=>state.spots.spotDetails)

 

  const reviewDetails = useSelector((state) => state.reviews.spot);
  // console.log("revieww details are here baby", reviewDetails)

  const currentUser = useSelector(state => state.session.user)
  
  const [dataLoaded, setDataLoaded] = useState(false);
  
  
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  
  const { spotId } = useParams() 
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  



  useEffect(() => {
    async function fetchData() {
      const getspot = await dispatch(SpotActions.getSpotDetailsThunk(spotId));
      const getReview = await dispatch(ReviewAction.getReviewsThunk(spotId));
      // console.log("spot id is ", spotId)
      setDataLoaded(true); 
    }
    fetchData();
  }, [dispatch, spotId]);

  

  
   const value = Object.values(reviewDetails )
  if(Object.values(spotDetail).length===0 ){
    // console.log("in first null")
    return null
  }

  if(!reviewDetails || Object.values(reviewDetails).length===0 ||reviewDetails===undefined || value===undefined) {
    
    return null
  }


  // console.log("the values are ", value)


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

function dateFormat(timestamp){

  const date = new Date(timestamp);

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthYearFormat = `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
return monthYearFormat;
}







const hasPostedReview = value[0].Reviews.some((element)=>{
  

  try{
  if(element.User.id===currentUser.id){
    return true
  }

}catch{
  return false
}





})




let isSpotOwner ;
try{

 isSpotOwner = spotDetail.Owner.id === currentUser.id;

}catch(error){
  


}


return (
  <>
    <div className='spotDetails-entire-container'>

    <div className='header'>
      <h1>{spotDetail.name}</h1>
      <p>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</p>
   </div>


   <div className='detailImages'>
  {/* First Image */}
  <div className='first-image'>
    <img id='s0' src={spotDetail.SpotImages[0].url} alt='img' key={0}></img>
  </div>

  {/* Other Images */}
  <div className='second-images'>
  {spotDetail.SpotImages.slice(1).map((element, index) => (
  
    <div className={`image${index + 1}`} key={index}>
      <img id={`s${index + 1}`} src={element.url} alt='img' key={index}></img>
    </div>
  
  ))}
    </div>
</div>


     <div className='hostedBy'>

    <h3> Hosted By {spotDetail.Owner.firstName}, {spotDetail.Owner.lastName}</h3> 


   
       <div className='callout-container'>
     <div><p className='description'>Description: {spotDetail.description}</p></div> 
      <div className='callout'>
        <p className='calloutPrice'>
         ${spotDetail.price} night <i className="fa-solid fa-star"></i>
          {spotDetail.avgStarRating} {formatReviewCount(spotDetail.numReviews)}
        </p>
        <button className='reserve' onClick={() => alert("feature coming soon")}>Reserve</button>
      </div>
      </div>  
      </div> 
      
   

    <div className='reviewsContainer'>
      <h1><i className="fa-solid fa-star"></i>{spotDetail.avgStarRating} {formatReviewCount(spotDetail.numReviews)}</h1>
      
      <div >
  
        
 
        {currentUser && !hasPostedReview && !isSpotOwner && spotDetail.numReviews>0 && (
     
          <OpenModalButton
        
            modalComponent={<ReviewForm spotId={spotId} onCloseModal={() => setIsReviewModalOpen(false)} />}
            buttonText="post a review !"
          
            
          />
        )}
      </div>

      <div>
        {currentUser && !hasPostedReview && !isSpotOwner && spotDetail.numReviews===0 &&   (
          <OpenModalButton
            modalComponent={<ReviewForm spotId={spotId} onCloseModal={() => setIsReviewModalOpen(false)} />}
            buttonText="Be the first to post a review!"
          />
        )}
      </div>



      {reviewDetails && Object.keys(reviewDetails).length > 0 && (
        <div>
          {value[0].Reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((element, index) => {
              const reviewId = element.id;
              const spotId = element.spotId;

              return (
                <div className='reviews-container'>
                  <div key={element.id}>
                  <h3 className='reviewer-name'>{element.User.firstName}</h3>
                  <p className='reviewer-date'>{dateFormat(element.createdAt)}</p>
                  <p className='des'>{element.review}</p>
                </div>

                  {currentUser && element.User.id === currentUser.id && (
                    <OpenModalButton
                      modalComponent={
                        <DeleteReview
                          reviewId={reviewId}
                          spotId={spotId}
                          onCloseModal={() => setIsReviewModalOpen(false)}
                        />
                      }
                      buttonText="Delete Review"
                    />
                  )}
                </div>
              );
            })}
        </div>
      
        
      )}
    </div>
</div>
  </>
)
}

