import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class PostCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            commits: props.commits,
        };
    }

    componentDidMount() {

    }

    render() {
        const CommitPosts = ({commits}) => {
            if(commits){
                return this.state.commits.map((commit) =>
                        <div style={{display: 'flex', justifyContent: 'center', padding: 10}}>
                            <Card style={{width: window.innerWidth}}>
                                <Card.Body>
                                    <Card.Title>Username</Card.Title>
                                    <Card.Text>
                                        This is my commit information and this is a post.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }
        }

        return(
            <CommitPosts commits={this.state.commits}/>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(PostCard);