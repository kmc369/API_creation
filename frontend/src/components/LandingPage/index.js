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
  
   
    if(!spots) return null

    let values 
    if(spots !== undefined){
     values = Object.values(spots)

    }
    return (

        <>
      <h1>hello</h1>
        <div className='landingPageContainer'>
        {console.log('values in the render', values)}
      
        {values[0].map((element, index) => (
          
            <div key={index}>
                <p>{element.state}</p> 
                <p>{element.address}</p>
                <p>{element.city}</p>
                
        </div>
        ))} 
     </div>
    </>
    
    );
}