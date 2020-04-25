import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
        this.pageDidScroll = this.pageDidScroll.bind(this);
    }

    componentDidMount() {

    }

    render() {

        return(
                <div>
                   THIS IS A FUPPING Feed!
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(UserFeed);