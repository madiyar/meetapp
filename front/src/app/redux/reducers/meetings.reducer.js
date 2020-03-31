import { GET_ALL_MEETINGS, SET_MEETINGS_LOADING, GET_CREATED_MEETINGS, GET_VISITED_MEETINGS } from "../types";

const initialState = {
    meetingsData: null,
    createdMeetings: null,
    visitedMeetings: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_MEETINGS:
            return {
                ...state,
                meetingsData: action.payload,
            }
        case GET_CREATED_MEETINGS:
            return {
                ...state,
                createdMeetings: action.payload
            }
        case GET_VISITED_MEETINGS:
            return {
                ...state,
                visitedMeetings: action.payload
            }
        case "ADD_MEETING":
            return {
                ...state,
                meetingsData: [...state.meetingsData, action.payload]
            }
        case SET_MEETINGS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}