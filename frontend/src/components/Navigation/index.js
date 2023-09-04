import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
  <div className='nav-container'>
  
        <div className='airbnb-logo-container'>
          <NavLink exact to="/"><i class="fa-brands fa-airbnb"></i></NavLink>
         <NavLink exact to ="/" className='airbnb'>airbnb</NavLink>
        </div>
        <div className='signUp-login-container'>
          {isLoaded && ( <ProfileButton user={sessionUser} /> )}
        </div>
  
  </div>
  )
}

export default Navigation;