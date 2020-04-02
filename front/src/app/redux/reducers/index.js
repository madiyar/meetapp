import { combineReducers } from "redux";
import meetingsReducer from "./meetings.reducer";
import roomsReducer from "./rooms.reducer";
import usersReducer from "./users.reducer";

const appReducers = combineReducers({
    meetings: meetingsReducer,
    rooms: roomsReducer,
    users: usersReducer,
});

export default appReducers;