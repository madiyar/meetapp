import { GET_FREE_ROOMS, SET_ROOMS_LOADING, GET_ALL_ROOMS, GET_ONE_ROOM } from "../types"

export const setFreeRooms = rooms => {
    return {
        type: GET_FREE_ROOMS,
        payload: rooms,
    }
}

export const setRooms = rooms => {
    return {
        type: GET_ALL_ROOMS,
        payload: rooms
    }
}

export const setRoom = room => {
    return {
        type: GET_ONE_ROOM,
        payload: room
    }
}

export const setLoading = status => {
    return {
        type: SET_ROOMS_LOADING,
        payload: status,
    }
}