import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {useHistory} from 'react-router-dom'

import './Navigation.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu();
  };

  const handleClick = () => {
    const obj = {
      credential:"du@gmail.com",
      password:"hello1"

    }
    return dispatch(sessionActions.login(obj))

  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (

    <>
        
         <div>
        {user && !(user?.email ==="du@gmail.com") && ( <div><button className="createSpot" onClick={()=> history.push('/spots')}>Create a Spot</button></div>)}
        </div>
      <button className="MenuButton" onClick={openMenu}>
      
      <i class="fa-solid fa-bars"></i>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
         
          <div className="Menu-Options-LoggedIn">
            <div className="Menu-Option">Hello {user.firstName}</div>
            <div className="Menu-Option">{user.username}</div>
            <div className="Menu-Option">{user.firstName} {user.lastName}</div>
            <div className="Menu-Option">{user.email}</div>
            <div className="Menu-Option" onClick={()=>history.push("/spots/current")}>
              {!(user.email ==="du@gmail.com") && ( <div>Manage Spot </div>)}
              </div>
            <div className="Menu-Option" onClick={logout}>Log Out</div>
            </div>
      

          </>
        ) : (
        
         <div className="Menu-Options-container">

            
        
            <OpenModalMenuItem
          
              itemText="Login In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
  
            />

            <button onClick={handleClick}>Login As Demo User</button>
    
          
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
        
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
