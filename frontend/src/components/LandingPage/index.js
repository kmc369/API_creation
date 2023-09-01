import './LandingPage.css'
import { useEffect } from 'react';
import * as SpotActions from '../../store/spot'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Tooltip } from './tooltip';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function LandingPage(){
    const history = useHistory()
    const dispatch = useDispatch()
    const spots = useSelector(state=>(state.spots.allSpots))
    // const spotImages = useSelector(state =>(state.spotImage.image))
    // const spotDetails = useSelector(state=>(state.spots.spotDetails))
    // console.log("the spot details are",spotDetails)
 
    useEffect(()=>{
        dispatch(SpotActions.getAllSpotsThunk())
        
    },[dispatch])
  
   
    if (Object.values(spots).length === 0) {
        return null
    }

    const values = Object.values(spots);


    
    return (
      
        <>
       
        <div id='landingPageContainer'>
      
       
        {values.map((element, index) => (
            
            <div className="spot" key={index} onClick={()=>{history.push(`/spots/${element.id}`)}}>
                <Tooltip text={element.name}>
                <img src={element?.previewImage} alt='image'></img>
                </Tooltip>
                
                <p className='city-star'>{element.state}, {element.city} <i class="fa-solid fa-star"></i>{parseInt(element.avgRating, 10)>0? parseInt(element.avgRating, 10).toFixed(1): 'New'}</p>
                <p>${element.price} night</p>

             

        </div>
        ))} 
     
     </div>
    </>
    
    );
}