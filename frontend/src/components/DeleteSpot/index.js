import React from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import * as SpotActions from '../../store/spot'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useModal } from "../../context/Modal";


export const DeleteSpot = ({spotId,onCloseModal}) => {
    console.log(spotId)
    const dispatch = useDispatch()
    const history= useHistory()
  

    const handleDelete = () => {
        dispatch(SpotActions.deleteSpotThunk(spotId));
        history.push("/spots/current")
      };

  return (
    <div>DeleteSpot
       <div className="delete-spot">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listing?</p>
      <button onClick={handleDelete}>Yes, Delete Spot</button>
      <button onClick={()=>onCloseModal}>No, Keep Spot</button>
    </div>
    </div>
  )
}
