import axios from "axios";
import setAuthToken from "../auth/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOGIN_LOADING, REGISTER_LOADING, CHANGE_PW_LOADING } from "./types"

const prefix = process.env.NODE_ENV === 'production' && process.env.SERVER_URL ?  process.env.SERVER_URL : "";

// Register User
export const registerUser = (userData, history) => dispatch => {
    dispatch(setRegisterLoading(true));
    axios
        .post(prefix + "/api/users/register", userData)
        .then(res => {
            history.push("/login");
            dispatch(setRegisterLoading(false));
        })
        .catch(err => {
            dispatch(setRegisterLoading(false));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });

        });
};

// Login - get user token
export const loginUser = userData => dispatch => {
    dispatch(setLoginLoading(true));
    axios
        .post(prefix + "/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            dispatch(setLoginLoading(false));
        })
        .catch(err => {
            dispatch(setLoginLoading(false));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

// Change password
export const changePassword = (userData, history) => dispatch => {
    dispatch(setChangePwLoading(true));
    axios
        .post(prefix + "/api/users/reset", userData)
        .then(res => {
            history.push({
                pathname: "/home",
                state: {from: "resetPw"}
            });
            dispatch(setChangePwLoading(false));
        })
        .catch(err =>
            {
                console.log('RESET ERR', err)
                dispatch(setChangePwLoading(false));
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });

            }
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Login loading
export const setLoginLoading = (loading) => {
    return {
        type: LOGIN_LOADING,
        loginLoading: loading
    };
};

// Register loading
export const setRegisterLoading = (loading) => {
    return {
        type: REGISTER_LOADING,
        registerLoading: loading
    };
};

// Change pw loading
export const setChangePwLoading = (loading) => {
    return {
        type: CHANGE_PW_LOADING,
        changePwLoading: loading
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
