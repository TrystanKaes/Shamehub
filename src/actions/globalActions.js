import actionTypes from '../constants/actionTypes';
import runtimeEnv from "@mars/heroku-js-runtime-env";

function themeChanged(){
    return {
        type: actionTypes.THEME_WAS_CHANGED,
    }
}

function loadingState(state){
    return {
        type: actionTypes.LOADING_CHANGE,
        load: state
    }
}

function fetchInsult(insult){
    return {
        type: actionTypes.INSULT_FETCHED,
        insult: insult
    }
}

export function changeTheme(){
    return dispatch => {
        dispatch(themeChanged());
    }
}

export function LoadState(state){
    return dispatch => {
        dispatch(loadingState(state));
    }
}

export function getInsult(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/insults`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data),   //This was causing issues, apparently you cannot send a body for a GET request
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    // we failed to retrieve an insult
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((res) => {
                dispatch(fetchInsult(res.insults.insult));
            })
            .catch((e) => console.log(e));
    }
}