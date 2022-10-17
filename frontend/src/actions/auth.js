import {api} from "../utils/api";

import Swal from 'sweetalert2';
import { setApiError } from "./api";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        const res = await api.get("/user");
        //console.log("Que wea", res.data)
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = (formData) => async (dispatch) => {

    try {
        console.log("Data Object: ", formData)
        
        
        const res = await api.post("/register", formData);
        Swal.fire({
            icon: "success",
            title: "Cuenta Registrada",
            allowOutsideClick: false,
            heightAuto: false,
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
            timer: 500
        })
    
        await dispatch({
            type: REGISTER_SUCCESS,
            payload: {token: res.data},
        });
        await dispatch(loadUser());
        
    } catch (err) {
        
        const response = err.response.data
        const msg = response.msg?response.msg:"El registro no se ha podido realizar.";
        const errors = response.errors?response.errors:response;

        Swal.fire({
            title: 'Registro fallido',
            text: msg,
            icon: 'error',
            allowOutsideClick: false,
            showCancelButton: false,
        })
        await dispatch({
            type: REGISTER_FAIL
        });
        dispatch(setApiError(msg, errors, 2000))
        
    }
};

// Login User
export const login = (data) => async (dispatch) => {
    

    try {
        const res = await api.post("/login", data);
        if(!res.data){
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                allowOutsideClick: false,
                heightAuto: false,
                showCancelButton: false,
                showCloseButton: true,
                showConfirmButton: false,
            })
        }else{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {token: res.data},
            });
    
            dispatch(loadUser());
        }
        
    } catch (err) {
        
        Swal.fire({
            icon: "error",
            title: "Autenticación Fallida",
            allowOutsideClick: false,
            heightAuto: false,
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
        })
        
        const response = err.response.data
        const msg = response.msg?response.msg:"Autenticación fallida";
        const errors = response.errors?response.errors:response;
        
        dispatch({
            type: LOGIN_FAIL,
            payload: errors[0]
        });
    }
};

// Logout
//export const logout = () => ({ type: LOGOUT });

export const logout = () => async (dispatch) => {
    try {
        
        
        dispatch({ type: LOGOUT });
    } catch (err) {
        dispatch({ type: LOGOUT });
    }
};