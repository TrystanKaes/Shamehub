import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class PostCard extends Component {
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
                <Card style={{ maxWidth: window.innerWidth/3 }}>
                    <Card.Body>
                        <Card.Title>Username</Card.Title>
                        <Card.Text>
                            This is my commit information and this is a post.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(PostCard);