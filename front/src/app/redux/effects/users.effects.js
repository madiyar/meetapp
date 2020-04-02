import { setUsers, setLoading } from "../actions/users.actions";

export function getAllUsers() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch(`http://localhost:8080/users`)
            .then(res => res.json())
            .then(users => {
                if(!users) {
                    dispatch(setUsers(null));
                    return;
                }
                dispatch(setUsers(users));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
}