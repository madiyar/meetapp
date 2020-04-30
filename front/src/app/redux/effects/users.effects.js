import { setUsers, setLoading } from "../actions/users.actions";
import { API_URL } from '../types';

export function getAllUsers() {
    return function(dispatch, getState) {
        dispatch(setLoading(true));
        return fetch(`${API_URL}/users`)
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