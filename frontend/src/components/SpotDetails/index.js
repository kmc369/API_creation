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
  
  
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  
  const { spotId } = useParams() 
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  

  const handleDeleteReview = async (reviewId) => {
    // You can add confirmation dialogs or other checks here if needed
    const deleted = await dispatch(ReviewAction.deleteReviewThunk(reviewId));
    if (deleted) {
      const getReview = await dispatch(ReviewAction.getReviewsThunk(spotId))

    }
  }






  
  
  useEffect(() => {
 

    async function fetchData() {

  
      const getspot= await dispatch(SpotActions.getSpotDetailsThunk(spotId));
      const getReview = await dispatch(ReviewAction.getReviewsThunk(spotId))
     
    }
    fetchData();
    
    
 
  }, [dispatch, spotId]);

  

  
   const value = Object.values(reviewDetails )
  if(Object.values(spotDetail).length===0 ){
    // console.log("in first null")
    return null
  }

  if(!reviewDetails || Object.values(reviewDetails).length===0 ||reviewDetails===undefined || value===undefined) {
    console.log("I returned null")
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





const hasPostedReview = value.some(
  review => review.User && currentUser && review.User.id === currentUser.id && review.spotId === spotId
);


const isSpotOwner = spotDetail.Owner.id === currentUser.id;



return (
  <>
    <div className='spotDetails'>
      <h1>{spotDetail.name}</h1>
      <p>{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</p>
    </div>

    <div className='detailImages'>
      {spotDetail.SpotImages.map((element, index) => (
        <img id={`s${index}`} src={element.url} alt="img" key={index}></img>
      ))}
    </div>

    <p>Hosted By: {spotDetail.Owner.firstName}, {spotDetail.Owner.lastName}</p>
    <p>Description: {spotDetail.description}</p>

    <div className='callout-container'>
      <div className='callout'>
        <p className='calloutPrice'>
          {spotDetail.price} night <i className="fa-solid fa-star"></i>
          {spotDetail.avgStarRating} {formatReviewCount(spotDetail.numReviews)}
        </p>
        <button className='reserve' onClick={() => alert("feature coming soon")}>Reserve</button>
      </div>
    </div>

    <div className='reviewsContainer'>
      <h1><i className="fa-solid fa-star"></i>{spotDetail.avgStarRating} {formatReviewCount(spotDetail.numReviews)}</h1>
      <div>
        {currentUser && !hasPostedReview && !isSpotOwner && (
          <OpenModalButton
            modalComponent={<ReviewForm spotId={spotId} onCloseModal={() => setIsReviewModalOpen(false)} />}
            buttonText="Post Your Review"
          />
        )}
      </div>

      {console.log("the values are", value[0].Reviews)}

      {value[0].Reviews
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((element, index) => {
          const reviewId = element.id;
          const spotId = element.spotId;

          return (
            <div key={element.id}>
              {console.log("the element id is", element.id)}
              <h3>{element.User.firstName}</h3>
              <p>{dateFormat(element.createdAt)}</p>
              <p>{element.review}</p>

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
  </>
)
}

