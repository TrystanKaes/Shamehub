import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUserFeed} from '../actions/userActions'
import RawFeed from "./rawfeed";
import Post from "./post";

//
// function getScrollPercent() {
//     let h = document.documentElement,
//         b = document.body,
//         st = 'scrollTop',
//         sh = 'scrollHeight';
//     return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
// }


class UserFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
    }

    // fetchFeed(){
    //     alert("Fetching...")
    //     const {dispatch} = this.props;
    //     dispatch(fetchUserFeed(0))
    // }

    componentDidMount() {


    }


    componentWillUnmount() {

    }

    render() {

        return(
                <div>
                    {/*<button onClick={this.fetchFeed.bind(this)}>FETCH USER FEED</button>*/}
                    {this.props.userfeed.sort((a,b)=>{
                        return new Date(b.commit_date) - new Date(a.commit_date)
                    }).map((post) =>
                        <Post commit={post}/>
                    )}
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userfeed: state.user.userfeed,
    }
}

export default connect(mapStateToProps)(UserFeed);