import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "../Utilities/post";
import {Loading} from '../Utilities/loading'

class UserFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
    }

    componentDidMount() {


    }


    componentWillUnmount() {

    }

    render() {

        return(
            <div>
                {(this.props.loadingState === "") ?
                    <div>
                        {/*<button onClick={this.fetchFeed.bind(this)}>FETCH USER FEED</button>*/}
                        {this.props.userfeed.sort((a, b) => {
                            return new Date(b.commit_date) - new Date(a.commit_date)
                        }).map((post) =>
                            <Post commit={post}/>
                        )}
                    </div>
                    :
                    <div>
                        {this.props.userfeed.sort((a, b) => {
                            return new Date(b.commit_date) - new Date(a.commit_date)
                        }).map((post) =>
                            <Post commit={post}/>
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
        userfeed: state.user.userfeed,
        loadingState: state.glob.loadingState
    }
}

export default connect(mapStateToProps)(UserFeed);