import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function userLoggedIn(username){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout(){
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function getInsult(data){
    const env = runtimeEnv();
    //return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/insults`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data),   //This was causing issues, apperently you cannot send a body for a GET request
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    // we failed to retrieve an insult
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                // The promise above returns to us the response in json format, now we want to send back an insult
                return res.insults; //TODO make this more specific once we can specify the category in the headers instead of body
            })
            .catch( (e) => console.log(e) );
    //}
}


export function submitLogin(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                return response.json();
            })
            .then( (res) => {
                // The promise above returns to us the response in json format, now we want to check if we've logged in or not
                if(res.success === "true") {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('token', res.token);

                    dispatch(userLoggedIn(data.username));
                }
                else{
                    // we didn't log in, display an insult
                    var data_to_send = {"category": "incorrect password"};  //TODO fix this to not be hardcoded once this is fixed in the backend
                    return getInsult(data_to_send);
                }
            })
            .then( (insult) => {
                //Here we are inside another god damn .then JAVASCRIPT YOU ARE FUCKING SOMETHING ALRIGHT
                var i = Math.floor(Math.random() * 4);
                var random = insult[i].insult;  //TODO fix this to not be from random and be specific once I can send the category through headers instead of body (backend)
                alert(random);
            })
            .catch( (e) => console.log(e) );
    }
}

export function submitRegister(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {

                dispatch(submitLogin(data));
            })
            .catch( (e) => console.log(e) );
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}