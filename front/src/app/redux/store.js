import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

import appReducers from "./reducers";

export default createStore(
    appReducers,
    composeWithDevTools(applyMiddleware(thunk))
);