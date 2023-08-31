import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as SpotActions from '../../store/spot'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useModal } from "../../context/Modal";


export const DeleteSpot = ({spotId,onCloseModal}) => {
    // console.log(spotId)
    const dispatch = useDispatch()
    const history= useHistory()
  

    const {closeModal} = useModal()
    const handleDelete = (e) => {
      e.preventDefault()
        dispatch(SpotActions.deleteSpotThunk(spotId));
        dispatch(SpotActions.getSpotByUserIdThunk(spotId))
        closeModal()
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
