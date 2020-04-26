import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "../Utilities/post";

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