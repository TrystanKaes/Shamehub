import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function userProfileFetched(profile){
    return {
        type: actionTypes.FETCH_GITHUB_INFO,
        profile_img: profile.profile_img,
        profile_name: profile.profile_name,
        profile_bio: profile.profile_bio,
        profile_github: profile.profile_github
    }
}

function userCommitsFetched(commits){
    return{
        type: actionTypes.FETCH_GITHUB_COMMITS,
        profile_commits: commits.profile_commits,   //this is expected to be an array
    }
}

function userRepoFetched(repos){
    return{
        type: actionTypes.FETCH_GITHUB_REPOS,
        profile_repos: repos.profile_repos, //excepted as an array
    }
}

export function fetchProfileInfo(profile){
    const env = runtimeEnv();
    //profile is expected to be the github username
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/github-user/` + profile, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data),   //you cannot send a body for a GET request, pass information in the header
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    // we failed to retrieve info
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((github_info) => {
                //process the info here
                let user_info = {
                    profile_img: github_info.profile_img,
                    profile_name: github_info.profile_name,
                    profile_bio: github_info.profile_bio,
                    //profile_github: github_info.profile_github
                };
                let user_commits = github_info.commits;
                let user_repos = github_info.repos;
                dispatch(userProfileFetched(user_info));
                dispatch(userCommitsFetched(user_commits));
                dispatch(userRepoFetched(user_repos));
            })
            .catch((e) => console.log(e));
    }
}
