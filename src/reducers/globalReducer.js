import constants from '../constants/actionTypes'

var initialState = {
    theme: 'light'
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);
    alert(updated['theme'])
    switch(action.type) {
        case constants.THEME_WAS_CHANGED:
            updated['theme'] = (updated['theme'] === 'light') ? 'dark' : 'light';
            return updated;
        default:
            return state;
    }
}