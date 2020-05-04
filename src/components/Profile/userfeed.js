import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "../Utilities/post";
import Loading from '../Utilities/loading'
import { fetchUserFeed } from "../../actions/userActions";
import {LoadState} from "../../actions/globalActions";

class UserFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            lastScroll: Date.now(),
        };
        this.scrolledtobottom = this.scrolledtobottom.bind(this)
        window.addEventListener('scroll', this.scrolledtobottom);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUserFeed(this.props.userfeed.length))
    }

    scrolledtobottom(){
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("you're at the bottom of the page");
                if (this.props.userfeed.length <= 0 || localStorage.getItem('UserfeedFetch') - Date.now() > 5000) {
                    const {dispatch} = this.props;
                    dispatch(fetchUserFeed(parseInt(this.props.userfeed.length))).then(dispatch(LoadState('')));
                    this.setState({lastScroll:Date.now()})
                }
            }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledtobottom);
    }

    render() {

        return(
            <div>
                {(this.props.loadingState === "") ?
                    <div>
                        {/*<button onClick={this.fetchFeed.bind(this)}>FETCH USER FEED</button>*/}
                        {this.props.userfeed.sort((a, b) => {
                            return new Date(b.commit_date) - new Date(a.commit_date)
                        }).map((post, i) =>
                            <Post key={i}  commit={post}/>
                        )}
                        <h6>End of Feed</h6>
                    </div>
                    :
                    <div>
                        {this.props.userfeed.sort((a, b) => {
                            return new Date(b.commit_date) - new Date(a.commit_date)
                        }).map((post, i) =>
                            <Post key={i} commit={post}/>
                        )}
                        <Loading/>
                    </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // userfeed: state.user.userfeed,
        loadingState: state.glob.loadingState
    }
}

export default connect(mapStateToProps)(UserFeed);