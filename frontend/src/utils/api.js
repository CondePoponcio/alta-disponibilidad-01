import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';
const BASE_URL_DERM = process.env.REACT_APP_API_SERVER || 'http://localhost:8000'

const api = axios.create({
    baseURL: BASE_URL_DERM,
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            store.dispatch({ type: LOGOUT });
        }
        return Promise.reject(err);
    }
);


export {
    api
}
