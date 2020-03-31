import { combineReducers } from "redux";
import meetingsReducer from "./meetings.reducer";
import roomsReducer from "./rooms.reducer";

const appReducers = combineReducers({
    meetings: meetingsReducer,
    rooms: roomsReducer,
});

export default appReducers;