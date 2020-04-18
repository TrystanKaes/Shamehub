import constants from '../constants/actionTypes'

var profileState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    profile_img: '',
    profile_name: '',
    profile_bio: '',
    profile_commits: [],
    profile_repos: [],
    profile_github: ''  //this is only 1 link, to create the githublink of a repo, use this link + repo name
}

export default (state = profileState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_GITHUB_INFO:
            updated['profile_img'] = action.profile_img;
            updated['profile_name'] = action.profile_name;
            updated['profile_bio'] = action.profile_bio;
            updated['profile_github'] = action.profile_github;
            return updated;

        case constants.FETCH_GITHUB_COMMITS:
            updated['profile_commits'] = action.profile_commits;
            return updated;

        case constants.FETCH_GITHUB_REPOS:
            updated['profile_repos'] = action.profile_repos;
            return updated;

        case constants.FETCH_GITHUB_ACTIVITY:
            //updated['profile_repos'] = action.profile_repos;
            return updated

        default:
            return state;
    }
}