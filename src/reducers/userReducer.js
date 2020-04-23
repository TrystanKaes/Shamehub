import constants from '../constants/actionTypes'

var initialState = {
    name: '',
    github_username: '',
    profile_img: '',
    github_link: '',
    bio: '',
    new_repo_info: null,
    fe_repo_info: null,
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
            updated['new_repo_info'] = action.user.new_repo_info;
            updated['fe_repo_info'] = action.user.fe_repo_info;
            return updated;

        case constants.USER_LOGOUT:
            updated = initialState
            updated['loggedIn'] = false;
            updated['username'] = '';
            return initialState;

        default:
            return state;
    }
}