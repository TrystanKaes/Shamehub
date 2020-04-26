import React from "react";
import store from "../../stores/store"
import loadingIconLight from '../../assets/loading-cylon-light.svg';
import loadingIconDark from '../../assets/loading-cylon-dark.svg';

export function Loading() {
    const theme = {
        text: (store.getState().glob.theme === 'dark') ? 'Dark-Text' : 'Light-Text',
        loader: (store.getState().glob.theme === 'dark') ? loadingIconLight : loadingIconDark,

    }
    return(
        <div>
            <h4 className={theme.text}>
                {store.getState().glob.loadingState + "  "}
            <img src={theme.loader} alt="Loading icon" />
            </h4>
        </div>
    )
}

// store.getState().glob.theme


// {(this.props.loadingState === "") ?
//     this.props.loggedIn ?
//         userLoggedIn
//         :
//         userNotLoggedIn
//     :
//     <Loading/>
//