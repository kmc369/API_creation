// import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';


import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
    return (
    <div>
           
           <motion.div // Wrap with motion.div for animation
                className={`Login-form-container `} 
                initial={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" }}
                animate={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
                transition={{ duration: 0.3 }}
              >
              <form  onSubmit={handleSubmit}>
                 <h1>Login</h1>
                <input
                 value={credential}
                 onChange={(e)=>setCredential(e.target.value)}
                 type="text"
                 id="creditial" 
                 name="creditial" 
                 placeholder="Username or Email" 
                 required
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2, duration: 0.5 }}
                 
                 />
              <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                id="password" 
                name="password" 
                placeholder="Password" 
                required 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }} 
                />
                {errors.credential && <p>{errors.credential}</p>}
                <button
                type="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                >Submit</button >
              </form>
            </motion.div>

            
        
    </div>
    );
}

export default LoginFormModal;