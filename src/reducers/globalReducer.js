import constants from '../constants/actionTypes'

var initialState = {
    theme: 'light',
    loadingState: '',
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);
    switch(action.type) {

        case constants.THEME_WAS_CHANGED:
            updated['theme'] = (updated['theme'] === 'light') ? 'dark' : 'light';
            return updated;

        case constants.LOADING_CHANGE:
            updated['loadingState'] = action.load;
            return updated;

        default:
            return state;
    }
}