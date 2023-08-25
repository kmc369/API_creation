import './LandingPage.css'
import { useEffect } from 'react';
import * as LandingActions from '../../store/landing'
import { useDispatch } from 'react-redux';

export default function LandingPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(LandingActions.getAllSpotsThunk())
        console.log(LandingActions.getAllSpotsThunk)
    },[dispatch])
    return (
        <div className='landingPageContainer'>
            <h1>hello</h1>



        </div>

    );
}