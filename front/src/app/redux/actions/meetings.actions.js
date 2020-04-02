import { GET_ALL_MEETINGS, SET_MEETINGS_LOADING, GET_CREATED_MEETINGS, GET_VISITED_MEETINGS, ADD_MEETING } from "../types"

export const setMeetings = meetings => {
    return {
        type: GET_ALL_MEETINGS,
        payload: meetings,
    }
}

export const setCreatedMeetings = meetings => {
    return {
        type: GET_CREATED_MEETINGS,
        payload: meetings
    }
}

export const setVisitedMeetings = meetings => {
    return {
        type: GET_VISITED_MEETINGS,
        payload: meetings
    }
}

export const setLoading = status => {
    return {
        type: SET_MEETINGS_LOADING,
        payload: status,
    }
}

export const addMeeting = meeting => {
    return {
        type: ADD_MEETING,
        payload: meeting,
    }
}