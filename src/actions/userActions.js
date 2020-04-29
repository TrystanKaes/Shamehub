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

function updateProfile(userInfo){
    return {
        type: actionTypes.UPDATE_USER,
        name: userInfo.name,
        bio: userInfo.bio,
        img: userInfo.profile_img,
    }
}

function appendFeed(nextFeedChunk){
    return {
        type: actionTypes.USERFEED_FETCHED,
        feed: nextFeedChunk.user_feed,
    }
}

function updateNewCommits(newCommits){
    return {
        type: actionTypes.FETCH_NEW_COMMITS,
        commits: newCommits.new_commits,
    }
}

function madeNewPost(userfeed){
    return {
        type: actionTypes.POSTED_TO_USERFEED,
        feed: userfeed,
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
                dispatch(LoadState('Logging you in'))
                // The promise above returns to us the response in json format, now we want to check if we've logged in or not
                if(res.success === true) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('token', res.token);

                    dispatch(userLoggedIn(data.username));

                    return res;  //res.message is the last part of the path/route that we want to use a GET request on
                }
                else{
                    alert(res.message)
                    dispatch(LoadState(''))
                }
            })
            .then( (res) => {
                // The promise above returns to us the response in json format, now we want to check if we've logged in or not
                if(res) {
                    dispatch(LoadState('Fetching your information'))
                    getUser(localStorage.getItem('username'))
                        .then(userInfo => {
                            dispatch(fetchUser(userInfo))
                        })
                        .then(res => {
                            dispatch(LoadState(''))
                        })
                }
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function submitRegister(data){
    // alert(JSON.stringify(data))
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
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function submitProfileUpdate(data){

    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/update/` + localStorage.getItem("username") + "/profile", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Updating your profile'))
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(LoadState(''));
                dispatch(updateProfile(res));
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function syncProfile(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/update/` + localStorage.getItem("username") + "/profile", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Syncing with GitHub'))
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res){
                    dispatch(LoadState(''))
                    dispatch(updateProfile(res));
                }
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function fetchNewCommits(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/update/` + localStorage.getItem("username") + "/commits", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Fetching your recent commits'))
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res){
                    dispatch(LoadState(''))
                    dispatch(updateNewCommits(res));
                }
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function PostNewCommits(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/userfeed/` + localStorage.getItem("username"), {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({"commits":data}),
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Posting'))
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res){
                    dispatch(LoadState(''))
                    dispatch(madeNewPost(data));
                }
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function fetchUserFeed(skip){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/userfeed/${localStorage.getItem('username')}/${skip}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            mode: 'cors'})
            .then( (response) => {
                dispatch(LoadState('Fetching userfeed'))
                if (!response.ok) {
                    dispatch(LoadState(''))
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res){
                    localStorage.setItem('UserfeedFetch', Date.now())
                    dispatch(LoadState(''))
                    dispatch(appendFeed(res));
                }
                return res;
            })
            .catch( (e) => console.log(e) )
            .then(dispatch(LoadState('')));
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}