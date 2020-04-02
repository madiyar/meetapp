import { GET_ALL_USERS, SET_USERS_LOADING } from "../types";

const initialState = {
    usersData: null,
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                usersData: action.payload,
            }
        case SET_USERS_LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default: 
            return state;
    }
}