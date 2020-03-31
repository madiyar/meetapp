import { GET_FREE_ROOMS, SET_ROOMS_LOADING, GET_ALL_ROOMS, GET_ONE_ROOM } from "../types";

const initialState = {
    freeRoomsData: null,
    roomsData: null,
    selectedRoom: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FREE_ROOMS:
            return {
                ...state,
                freeRoomsData: action.payload,
            }
        case GET_ALL_ROOMS:
            return {
                ...state,
                roomsData: action.payload
            }
        case GET_ONE_ROOM:
            return {
                ...state,
                selectedRoom: action.payload
            }
        case SET_ROOMS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        
        default: 
            return state;
    }
}