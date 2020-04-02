import { setMeetings, setLoading, setCreatedMeetings, setVisitedMeetings, addMeeting } from "../actions/meetings.actions";

export function getMeetings() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch('http://localhost:8080/meetings')
            .then(res => res.json())
            .then(meetings => {
                if (!meetings || !meetings.length) {
                    dispatch(setMeetings(null));
                    return;
                }
                dispatch(setMeetings(meetings));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}

export function getCreatedMeetings() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        const id = JSON.parse(localStorage.getItem('user')).id;
        return fetch(`http://localhost:8080/users/${id}/meetings/created`)
            .then(res => res.json())
            .then(meetings => {
                if (!meetings || !meetings.length) {
                    dispatch(setCreatedMeetings(null));
                    return;
                }
                dispatch(setCreatedMeetings(meetings));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}

export function getVisitedMeetings() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        const id = JSON.parse(localStorage.getItem('user')).id;
        return fetch(`http://localhost:8080/users/${id}/meetings`)
            .then(res => res.json())
            .then(meetings => {
                if (!meetings || !meetings.length) {
                    dispatch(setVisitedMeetings(null));
                    return;
                }
                let visitedMeetings = [];
                meetings.map(meeting => {
                    visitedMeetings.push(meeting.meeting);
                })
                dispatch(setVisitedMeetings(visitedMeetings));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}

export function createMeeting(data) {
    return function(dispatch, getState) {
        const meetingOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.meeting)
        };
        return fetch('http://localhost:8080/meetings', meetingOptions)
            .then(res => res.json())
            .then(meeting => {
                data.participans.map(participan => {
                    const participanOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({meetingId: meeting.id, userId: parseInt(participan)})
                    };
                    return fetch('http://localhost:8080/participans', participanOptions);
                });
                dispatch(addMeeting(meeting));
            })
    }
}