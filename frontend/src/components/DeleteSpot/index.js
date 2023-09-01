import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as SpotActions from '../../store/spot'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useModal } from "../../context/Modal";


export const DeleteSpot = ({spotId,onCloseModal}) => {
    // console.log(spotId)
    const dispatch = useDispatch()
    const history= useHistory()
    const userSpots = useSelector(state =>state.spots.allSpots)


    const {closeModal} = useModal()
    const handleDelete = async (e) => {
  
       await dispatch(SpotActions.deleteSpotThunk(spotId));
        closeModal()
       await  dispatch(SpotActions.getSpotByUserIdThunk())
      };
    
  return (
    <div>DeleteSpot
       <div className="delete-spot">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listing?</p>
      <button type='submit' onClick={handleDelete} >Yes, Delete Spot</button>
      <button onClick={closeModal}>No, Keep Spot</button>
    </div>
    </div>
  )
}

export default DeleteSpot
