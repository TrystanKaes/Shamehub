import constants from '../constants/actionTypes'
import {SynthesizeSocialContact} from "../helpers/SyntheticSocial";
// import uniq from 'lodash/uniq';

var initialState = {
    theme: 'light',
    loadingState: '',
    insult: 'You got this!',
    discoverfeed: [],
    selectedPost: null,
    selectedUser: null,

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

        case constants.USER_SELECTED:
            updated['selectedUser'] = action.user;
            let feed = updated['selectedUser'].repo_info.posts;
            // console.log(feed)
            updated['selectedUser'].repo_info.posts = SynthesizeSocialContact(feed);
            return updated;

        case constants.DISCOVERFEED_FETCHED:
            // let duplicateArray = updated['discoverfeed'].concat(action.feed);
            // let uniqArray = duplicateArray.filter((thing, index) => {
            // const _thing = JSON.stringify(thing);
            //     return index === duplicateArray.findIndex(obj => {
            //         return JSON.stringify(obj) === _thing;
            //     });
            // });
            updated['discoverfeed'] = SynthesizeSocialContact(action.feed);
            return updated;

        case constants.ADD_COMMENT:
            let newFeed = updated['discoverfeed'];
            for(let i = 0; i < newFeed.length; i+=1){
                if(JSON.stringify(action.post) == JSON.stringify(newFeed[i])){
                    newFeed[i].comments.push(action.comment)
                    break;
                }
            }
            updated['discoverfeed'] = newFeed;
            return updated;

        default:
            return state;
    }
}