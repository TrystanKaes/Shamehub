import actionTypes from '../constants/actionTypes';

function themeChanged(){
    return {
        type: actionTypes.THEME_WAS_CHANGED,
    }
}

export function changeTheme(){
    return dispatch => {
        dispatch(themeChanged());
    }
}
