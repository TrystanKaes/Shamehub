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
        return fetch(`${env.REACT_APP_API_URL}/insults/` + data, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data),   //This was causing issues, apparently you cannot send a body for a GET request
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    // we failed to retrieve an insult
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch( (e) => console.log(e) );
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
                if(res.success === true) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('token', res.token);

                    dispatch(userLoggedIn(data.username));
                }
                else{
                    // we didn't log in, display an insult
                    return getInsult(res.message);  //res.message is the last part of the path/route that we want to use a GET request on
                }
            })
            .then( (insult) => {
                //Here we are inside another god damn .then JAVASCRIPT YOU ARE FUCKING SOMETHING ALRIGHT
                if(insult == null){
                    //this is checking for if insult is undefined, if it is undefined it means that we never generated an insult therefore they logged in successfully
                    alert("Congrats on logging in :)");
                }
                else{
                    alert(insult.insult.insult);    // the insult is kind of burried haha
                }
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