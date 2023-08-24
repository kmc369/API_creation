import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect} from 'react';

import {login} from "../../store/sessions"

import React, { useState } from "react";
import * as sessionActions from "../../store/sessions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";
export default function LoginFormPage(){
  
        const dispatch = useDispatch();
        const sessionUser = useSelector((state) => state.session.user);
        const [credential, setCredential] = useState("");
        const [password, setPassword] = useState("");
        const [errors, setErrors] = useState({});
      
        if (sessionUser) return <Redirect to="/" />;
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setErrors({});
          return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );
        };
    return (
    <div>
           
            <motion.form  onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="animated-form" >
                 <p>Login</p>
                <TextField
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
              <TextField
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
                <Button
                type="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                >Submit </Button>
            </motion.form>

            
        
    </div>
    );
}