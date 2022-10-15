import { v4 as uuidv4 } from 'uuid';
import { SET_API_ALERT, REMOVE_API_ALERT } from './types';

export const setApiError = (msg, errors, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_API_ALERT,
        payload: { msg, errors, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_API_ALERT, payload: id }), timeout);
};
