import { GET_ALL_USERS, SET_USERS_LOADING } from "../types"

export const setUsers = users => {
    return {
        type: GET_ALL_USERS,
        payload: users,
    }
}

export const setLoading = status => {
    return {
        type: SET_USERS_LOADING,
        payload: status,
    }
}