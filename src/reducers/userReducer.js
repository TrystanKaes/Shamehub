import constants from '../constants/actionTypes'

var initialState = {
    name: '',
    github_username: '',
    profile_img: '',
    github_link: '',
    bio: '',
    new_commits: null,
    repo_info: null,
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
            return updated;

        case constants.USER_LOGOUT:
            updated = initialState
            updated['loggedIn'] = false;
            updated['username'] = '';
            return updated;

        case constants.UPDATE_USER:
            updated['name'] = action.name ? action.name : updated['name'];
            updated['bio'] = action.bio ? action.bio : updated['bio'];
            updated['profile_img'] = action.img ? action.img : updated['profile_img'];
            return updated;

        default:
            return state;
    }
}