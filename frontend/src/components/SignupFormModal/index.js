import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css"
import { motion } from 'framer-motion';


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // useEffect(()=>{
  //   const errorOBJ = {}

  //   if(!email){
  //     errorOBJ.email = "CAN NOT BE EMPTY"
  //   }

  //   if(!username || username.length<4){
  //     errorOBJ.username = "TO SHORT"
  //   }

  //   if(!firstName){
  //     errorOBJ.firstName = "CAN NOT BE EMPTY"
  //   }


  //   if(!lastName){
  //     errorOBJ.lastName = "CAN NOT BE EMPTY"
  //   }


  //   if(!password || password.length<6){
  //     errorOBJ.password = "TO SHORT"
  //   }


  //   if(!confirmPassword || password!==confirmPassword){
  //     errorOBJ.confirmPassword = "PASSWORDS MUST MATCH"
    
  //   }
 

  //     setErrors(errorOBJ)
    
  // },[email,username,firstName,lastName,password,confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();


    const errorOBJ = {}

    if(!email){
      errorOBJ.email = "CAN NOT BE EMPTY"
    }

    if(!username || username.length<4){
      errorOBJ.username = "TO SHORT"
    }

    if(!firstName){
      errorOBJ.firstName = "CAN NOT BE EMPTY"
    }


    if(!lastName){
      errorOBJ.lastName = "CAN NOT BE EMPTY"
    }


    if(!password || password.length<6){
      errorOBJ.password = "TO SHORT"
    }


    if(!confirmPassword || password!==confirmPassword){
      errorOBJ.confirmPassword = "PASSWORDS MUST MATCH"
    
    }
 

      setErrors(errorOBJ)
















    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
    <motion.div // Wrap with motion.div for animation
      className={`signup-form-container `}
      initial={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" }}
      animate={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
      transition={{ duration: 0.3 }}
    >

      <form onSubmit={handleSubmit}>
      {errors.email && <p>{errors.email}</p>}
      {errors.username && <p>{errors.username}</p>}
      <h1>Sign Up</h1>
    
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
       
    
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
       
      
        
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
       
        {errors.firstName && <p>{errors.firstName}</p>}
       
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
       
        {errors.lastName && <p>{errors.lastName}</p>}
      
         
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
   
        {errors.password && <p>{errors.password}</p>}
        
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
    
        {errors.confirmPassword && (
         <p>{errors.confirmPassword}</p>
        )}
        <button 
        disabled={Object.keys(errors).length>0}
        className={`submit-button ${Object.keys(errors).length > 0 ? "disabled-button" : "enabled-button"}`}
        style={{ backgroundColor: Object.keys(errors).length > 0 ? 'rgb(187, 186, 186)' : 'rgb(0, 123, 255)' }}
        type="submit">Sign Up</button>
      </form>

      </motion.div>
    </>
  );
}

export default SignupFormModal;