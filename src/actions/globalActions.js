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

function appendDiscFeed(nextFeedChunk){
    return {
        type: actionTypes.DISCOVERFEED_FETCHED,
        feed: nextFeedChunk,
    }
}

function postSelected(post){
    return {
        type: actionTypes.POST_SELECTED,
        post: post
    }
}

export function selectPost(post){
    return dispatch => {
        dispatch(postSelected(post));
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
            .catch((e) => console.log(e))
            .then(dispatch(LoadState('')));
    }
}

export function fetchDiscoverFeed(skip){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/discoveryFeed/${skip}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Fetching discovery feed'))
                if (!response.ok) {
                    dispatch(LoadState(''))
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res){
                    // alert(res.discovery_field.length)
                    dispatch(LoadState(''))
                    localStorage.setItem('DiscoverFetch', Date.now())
                    dispatch(appendDiscFeed(res.discovery_field));
                }
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}