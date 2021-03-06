import constants from '../constants/actionTypes'
import { SynthesizeSocialContact } from '../helpers/SyntheticSocial'

var initialState = {
    name: '',
    github_username: '',
    profile_img: '',
    github_link: '',
    bio: '',
    new_commits: null,
    repo_info: null,
    repo_names: null,
    userfeed: [],
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.USER_LOGGEDIN:
            updated['loggedIn'] = true;
            updated['username'] = action.username;
            return updated;

        case constants.FETCH_USER:
            updated['name'] = action.user.name;
            updated['github_username'] = action.user.github_username;
            updated['profile_img'] = action.user.profile_img;
            updated['github_link'] = action.user.github_link;
            updated['bio'] = action.user.bio;
            updated['new_commits'] = action.user.new_commits;
            updated['repo_info'] = action.user.repo_info;
            updated['repo_names'] = action.user.repo_info.repo_names;
            return updated;

        case constants.UPDATE_USER:
            updated['name'] = action.name ? action.name : updated['name'];
            // updated['bio'] = action.bio ? action.bio : updated['bio'];
            updated['bio'] = action.bio;
            updated['profile_img'] = action.img ? action.img : updated['profile_img'];
            return updated;

        case constants.FETCH_NEW_COMMITS:
            updated['new_commits'] = action.commits ? action.commits : updated['new_commits'];
            return updated;

        case constants.USERFEED_FETCHED:
            let duplicateArray = updated['userfeed'].concat(action.feed)
            let uniqArray = duplicateArray.filter((thing, index) => {
                const _thing = JSON.stringify(thing);
                return index === duplicateArray.findIndex(obj => {
                    return JSON.stringify(obj) === _thing;
                    });
                });
            let Social = SynthesizeSocialContact(uniqArray)
            updated['userfeed'] = Social;
            return updated;

        case constants.POSTED_TO_USERFEED:
            updated['userfeed'] = updated['userfeed'].push(action.post);
            return updated;

        case constants.USER_LOGOUT:
            updated = initialState;
            updated['loggedIn'] = false;
            updated['username'] = '';
            return updated;

        case constants.ADD_COMMENT:
            let newFeed = updated['userfeed'];
            for(let i = 0; i < newFeed.length; i+=1){
                if(JSON.stringify(action.post) === JSON.stringify(newFeed[i])){
                    newFeed[i].comments.push(action.comment)
                    break;
                }
            }
            updated['userfeed'] = newFeed;
            return updated;

        default:
            return state;
    }
}

