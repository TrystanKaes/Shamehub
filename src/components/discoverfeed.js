import React, { Component } from 'react';
import { connect } from 'react-redux';
import RawFeed from "./rawfeed";
const commits = [
    {
        username: "CHARLIE",
        message: "OMg this is not working well."
    },
    {
        username: "Tony",
        message: "Finally!!!!!"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up."
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },

]
class DiscoverFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
    }

    componentDidMount() {

    }

    render() {

        return(
            <div>
                THIS IS A Discovery FUPPING Feed!
                <RawFeed commits={commits}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(DiscoverFeed);