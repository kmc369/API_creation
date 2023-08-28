import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";
import Navigation from '../src/components/Navigation'
import LandingPage from "../src/components/LandingPage";
import { Route } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  document.title = "airbnb"
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
      <Route path="/">
          <LandingPage/>
      </Route>
        </Switch>}
    </>
  );
}

export default App;