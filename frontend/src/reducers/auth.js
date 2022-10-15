import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
};

function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: true,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        case ACCOUNT_DELETED:
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}

export default authReducer;
