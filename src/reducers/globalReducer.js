import constants from '../constants/actionTypes'
// import uniq from 'lodash/uniq';

var initialState = {
    theme: 'light',
    loadingState: '',
    insult: 'You got this!',
    discoverfeed: [],
    selectedPost: null,

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

        case constants.INSULT_FETCHED:
            updated['insult'] = action.insult;
            return updated;

        case constants.POST_SELECTED:
            updated['selectedPost'] = action.post;
            return updated;

        case constants.DISCOVERFEED_FETCHED:
            // let duplicateArray = (updated['discoverfeed'])? action.feed : [].concat(updated['discoverfeed'],action.feed);
            // updated['discoverfeed'] = uniq(duplicateArray, 'commit_date');
            // updated['discoverfeed'] = updated['discoverfeed'].concat(action.feed);
            return updated;

        default:
            return state;
    }
}