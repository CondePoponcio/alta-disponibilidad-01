import { SET_API_ALERT, REMOVE_API_ALERT } from '../actions/types';

const initialState = [];

function alertReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_API_ALERT:
            return [...state, payload];
        case REMOVE_API_ALERT:
            return state.filter((alert) => alert.id !== payload);
        default:
            return state;
    }
}

export default alertReducer;
