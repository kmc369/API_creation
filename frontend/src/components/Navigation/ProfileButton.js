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
        {user && ( <div><button className="createSpot" onClick={()=> history.push('/spots')}>Create a Spot</button></div>)}
        </div>
      <button className="MenuButton" onClick={openMenu}>
      
      <i class="fa-solid fa-bars"></i>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
         
          <div className="Menu-Options-LoggedIn">
            <div className="Menu-Option1">Hello {user.firstName}</div>
            <div className="Menu-Option2">{user.username}</div>
            <div className="Menu-Option3">{user.firstName} {user.lastName}</div>
            <div className="Menu-Option4">{user.email}</div>
            <div className="Menu-Option5" onClick={()=>history.push("/spots/current")}>
              {user && ( <div>Manage Spot </div>)}
              </div>
            <button className="Menu-Option logout-button" onClick={logout}>Log Out</button>
            </div>
      

          </>
        ) : (
        
         <div className="Menu-Options-container">

            
           <div className="menuButtons" onClick={handleClick}>Login As Demo User</div>
            <OpenModalMenuItem
              
              itemText="Login In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
  
            />

    

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
