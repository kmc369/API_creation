import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { restoreCSRF, csrfFetch } from '../store/csrf';
import sessionsReducer from "./session";
import * as sessionActions from '../store/session';
// import * as landingAction from '../store/landing'
// import getDetailReducer from "./details";
import reviewsReducer from "./reviews";
import spotReducer from "./spot";

const rootReducer = combineReducers({
  // add reducer functions here
  session:sessionsReducer,
  reviews:reviewsReducer,
  spots:spotReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};
const store = configureStore()
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();


  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}
export default configureStore;
