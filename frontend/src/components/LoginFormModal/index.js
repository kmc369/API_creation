// import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';


import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { NavLink } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleClick = () => {
    const obj = {
      credential:"du@gmail.com",
      password:"hello1"

    }
    closeModal()
    return dispatch(sessionActions.login(obj))
  }

  useEffect(()=>{
    const error = {}
    if(credential.length<4){
      error.credentials = "NAME MUST BE GREATER THAN FOUR CHARACTERS"
    }

    if(password.length<6){
      error.passwords = "PASSWORD MUST BE GREATER THAN 6 CHARACTERS"
    }

    setErrors(error)
  },[credential,password])



    return (
    <div className='login-container'>
           
           {/* <motion.div // Wrap with motion.div for animation
                className={`Login-form-container `} 
                initial={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" }}
                animate={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
                transition={{ duration: 0.3 }}
              > */}
              <form  onSubmit={handleSubmit}>
                 <h1>Login</h1>
                 <label>Username or email</label>
                 <input
                 value={credential}
                 onChange={(e)=>setCredential(e.target.value)}
                 type="text"
                 id="creditial" 
                 name="creditial" 
                //  placeholder="Username or Email" 
                 required
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                //  transition={{ delay: 0.2, duration: 0.5 }}
                 
                 />
              <label>Password</label>
              <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                id="password" 
                name="password" 
                // placeholder="Password" 
                required 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }} 
                className='username'
                />
                {errors.credential && errors.credential}
                <button
                type="submit"
                disabled={Object.keys(errors).length>0}
                className={`submit-button ${Object.keys(errors).length > 0 ? "disabled-button" : "enabled-button"}`}
                style={{ backgroundColor: Object.keys(errors).length > 0 ? 'rgb(187, 186, 186)' : 'rgb(0, 123, 255)' }}

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // transition={{ delay: 0.6, duration: 0.5 }}
                >Log In</button >

            <div className='demoUser' onClick={handleClick}>Demo User</div>

               

              
              </form>
            {/* </motion.div> */}

            
        
    </div>
    );
}

export default LoginFormModal;