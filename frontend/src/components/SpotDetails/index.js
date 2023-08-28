import React, { useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as DetailActions from '../../store/details'
import { useParams } from 'react-router-dom'; 

export default function SpotDetails({match}) {
  const spotDetail = useSelector(state=>state.details.spot)
  const dispatch = useDispatch()

  const { spotId } = useParams() // Extract spotId from URL params
  console.log(spotId)
  useEffect(() => {
    dispatch(DetailActions.getSpotDetailsThunk(spotId)); // Pass spotId to action creator
  }, [dispatch, spotId]);


  return (
    <div>SpotDetails Hello</div>
  )
}


