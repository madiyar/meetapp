import { setFreeRooms, setRooms, setLoading, setRoom, setRoomsMeetings } from "../actions/rooms.actions";

export function getFreeRooms(startDate, endDate) {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        const meetingsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate: startDate, endDate: endDate })
        };
        return fetch('http://localhost:8080/meetings/find-room', meetingsOptions)
            .then(response => response.json())
            .then(meetings => {
                let rooms = [];
                meetings.map(meeting => {
                    if(!rooms.includes(meeting.roomId)) {
                        rooms.push(meeting.roomId);
                    }
                    return meeting;
                });
                return rooms;
            })
            .then(rooms => {
                if(rooms.length) {
                    const roomsOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ids: rooms })
                    };
                    return fetch('http://localhost:8080/rooms/free', roomsOptions)
                        .then(res => res.json())
                        .then(rooms => {
                            if (!rooms || !rooms.length) {
                                dispatch(setFreeRooms(null));
                                return;
                            }
                            dispatch(setFreeRooms(rooms));
                        })
                        .finally(() => {
                            dispatch(setLoading(false));
                        });
                } else {
                    const roomsOptions = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    };
                    return fetch('http://localhost:8080/rooms', roomsOptions)
                        .then(res => res.json())
                        .then(rooms => {
                            if (!rooms || !rooms.length) {
                                dispatch(setFreeRooms(null));
                                return;
                            }
                            dispatch(setFreeRooms(rooms));
                        })
                        .finally(() => {
                            dispatch(setLoading(false));
                        });
                }
            });
    }
}

export function getRooms() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch('http://localhost:8080/meetings/today')
            .then(response => response.json())
            .then(meetings => {
                let todayMeetings = [];
                meetings.map(meeting => {
                    if(!todayMeetings.includes(meeting.roomId)) {
                        let sD = new Date(Date.parse(meeting.startDate))
                        let eD = new Date(Date.parse(meeting.endDate))
                        sD = `${(sD.getHours()>9)?sD.getHours():'0'+sD.getHours()}:${(sD.getMinutes()>9)?sD.getMinutes():'0'+sD.getMinutes()}`;
                        eD = `${(eD.getHours()>9)?eD.getHours():'0'+eD.getHours()}:${(eD.getMinutes()>9)?eD.getMinutes():'0'+eD.getMinutes()}`;
                        todayMeetings.push({...meeting.room, startDate: sD, endDate: eD });
                    }
                    return meeting;
                });
                return todayMeetings;
            })
            .then(todayMeetings => {
                return fetch('http://localhost:8080/rooms')
                    .then(res => res.json())
                    .then(rooms => {
                        if (!rooms || !rooms.length) {
                            dispatch(setRooms(null));
                            return;
                        }
                        let allRooms = [];
                        rooms.map(room => {
                            if(todayMeetings.length) {
                                todayMeetings.map(item => {
                                    if(allRooms.findIndex(obj => obj.id === room.id) === -1) {
                                        if(item.id === room.id) {
                                            allRooms.push(item);
                                        } else {
                                            allRooms.push(room);
                                        }
                                    }
                                    return item;
                                });
                            } else {
                                allRooms.push(room);
                            }
                            return room;
                        })
                        dispatch(setRooms(allRooms));
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                    });
            })
            
    }
}

/*
export function getRooms() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch('http://localhost:8080/meetings/today')
            .then(response => response.json())
            .then(meetings => {
                let todayMeetings = [];
                meetings.map(meeting => {
                    if(!todayMeetings.includes(meeting.roomId)) {
                        let sD = new Date(Date.parse(meeting.startDate))
                        let eD = new Date(Date.parse(meeting.endDate))
                        sD = `${(sD.getHours()>9)?sD.getHours():'0'+sD.getHours()}:${(sD.getMinutes()>9)?sD.getMinutes():'0'+sD.getMinutes()}`;
                        eD = `${(eD.getHours()>9)?eD.getHours():'0'+eD.getHours()}:${(eD.getMinutes()>9)?eD.getMinutes():'0'+eD.getMinutes()}`;
                        todayMeetings.push({...meeting.room, startDate: sD, endDate: eD });
                    }
                    return meeting;
                });
                return todayMeetings;
            })
            .then(todayMeetings => {
                return fetch('http://localhost:8080/rooms')
                    .then(res => res.json())
                    .then(rooms => {
                        if (!rooms || !rooms.length) {
                            dispatch(setRooms(null));
                            return;
                        }
                        let allRooms = [];
                        rooms.map(room => {
                            if(todayMeetings.length) {
                                todayMeetings.map(item => {
                                    if(item.id === room.id) {
                                        allRooms.push(item);
                                    } else {
                                        allRooms.push(room);
                                    }
                                    return item;
                                });
                            } else {
                                allRooms.push(room);
                            }
                            return room;
                        })
                        dispatch(setRooms(allRooms));
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                    });
            })
            
    }
}
*/


export function getOneRoom(id) {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch(`http://localhost:8080/rooms/${id}`)
            .then(res => res.json())
            .then(room => {
                if(!room) {
                    dispatch(setRoom(null));
                    return;
                }
                dispatch(setRoom(room));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}

export function getRoomsMeetings(id) {
    return function(dispatch, getState) {
        return fetch(`http://localhost:8080/rooms/${id}/meetings/today`)
            .then(res => res.json())
            .then(meetings => {
                if(!meetings) {
                    dispatch(setRoomsMeetings(null));
                    return;
                }
                let todayMeetings = [];
                meetings.map(meeting => {
                    let sD = new Date(Date.parse(meeting.startDate))
                    let eD = new Date(Date.parse(meeting.endDate))
                    sD = `${(sD.getHours()>9)?sD.getHours():'0'+sD.getHours()}:${(sD.getMinutes()>9)?sD.getMinutes():'0'+sD.getMinutes()}`;
                    eD = `${(eD.getHours()>9)?eD.getHours():'0'+eD.getHours()}:${(eD.getMinutes()>9)?eD.getMinutes():'0'+eD.getMinutes()}`;
                    todayMeetings.push({...meeting, startDate: sD, endDate: eD });
                    return meeting;
                });
                dispatch(setRoomsMeetings(todayMeetings));
            });
    }
}