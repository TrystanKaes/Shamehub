import React, {Component} from "react";
import loadingIconLight from '../../assets/loading-cylon-light.svg';
import loadingIconDark from '../../assets/loading-cylon-dark.svg';
import {connect} from "react-redux";

class Loading extends Component {

    render(){
        const theme = {
            text: (this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text',
            loader: (this.props.theme === 'dark') ? loadingIconLight : loadingIconDark,

        }
        return(
            <div>
                <h4 className={theme.text}>
                    {this.props.loadingState + "  "}
                    <img src={theme.loader} alt="Loading icon" />
                </h4>
            </div>
        )

    }

}

const mapStateToProps = state => {
    return {
        loadingState: state.glob.loadingState,
        theme: state.glob.theme,
    }
}

export default connect(mapStateToProps)(Loading)

// store.getState().glob.theme


// {(this.props.loadingState === "") ?
//     this.props.loggedIn ?
//         userLoggedIn
//         :
//         userNotLoggedIn
//     :
//     <Loading/>
//