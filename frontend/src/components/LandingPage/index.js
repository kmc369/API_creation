import './LandingPage.css'
import { useEffect } from 'react';
import * as LandingActions from '../../store/landing'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function LandingPage(){
      
    const dispatch = useDispatch()
    const spots = useSelector(state=>(state.landing.spots))
    useEffect(()=>{
        dispatch(LandingActions.getAllSpotsThunk())
    },[dispatch])
  
   
    if (Object.values(spots).length === 0) {
        return null
    }

    const values = Object.values(spots);
    
    return (

        <>
      
        <div id='landingPageContainer'>
        {console.log('values in the render', values)}
      
        {values[0].map((element, index) => (
          
            <div className="spot" key={index}>
                <img src={element.previewImage} alt='image'></img>
                <p>{element.state}, {element.city}</p> 
                <p>{element.name}</p>
                <p>${element.price} /night</p>
             
                
        </div>
        ))} 
     </div>
    </>
    
    );
}