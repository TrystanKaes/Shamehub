import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class ProfileFeed extends Component {
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
                        <div style={{display: 'flex', justifyContent: 'center', padding: 10}} class="Scrolling-Feed">
                            <Card style={{width: window.innerWidth}}>
                                <Card.Body>
                                    <Card.Title style={{justifyContent: 'left'}}>@{commit.username}</Card.Title>
                                    <Card.Text>
                                        {commit.message}
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

export default connect(mapStateToProps)(ProfileFeed);