import { api } from './api';

const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['Token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;
