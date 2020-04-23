import actionTypes from '../constants/actionTypes';

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
