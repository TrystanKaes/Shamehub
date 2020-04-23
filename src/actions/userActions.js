import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { LoadState } from './globalActions'

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

function fetchUser(userInfo){
    return {
        type: actionTypes.FETCH_USER,
        user: userInfo
    }
}

export function getUser(username){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/users/` + username, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
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
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('token', res.token);

                    dispatch(userLoggedIn(data.username));

                    return res;  //res.message is the last part of the path/route that we want to use a GET request on
                }
                else{
                    // we didn't log in, display an insult
                    var insult = getInsult(res.message)
                    alert("The insults are broken. The API returns an empty json.")
                    alert(insult.insult.insult);    // the insult is kind of burried haha
                }
            })
            .then( (res) => {
                dispatch(LoadState('fetchUser'))
                // The promise above returns to us the response in json format, now we want to check if we've logged in or not
                if(res) {
                    getUser(localStorage.getItem('username'))
                        .then(userInfo => {
                            dispatch(fetchUser(userInfo))
                        })
                        .then(res => {
                            dispatch(LoadState(''))
                        })
                }
            })
            .catch( (e) => console.log(e) );
    }
}

export function submitRegister(data){
    alert(JSON.stringify(data))
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