import React, { Component } from 'react';
import {Card, Row} from 'react-bootstrap';
import { connect } from 'react-redux';

class RawFeed extends Component {
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
                            <Card style={{width: window.innerWidth, borderRadius: 10, borderColor:'#0f110c'}}>
                                <Card.Body>
                                    <Row style={{justifyContent: 'left', padding: 10, align:'top'}}>
                                        <Card.Title>
                                                <a href={"https://github.com/" + commit.username}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   style={{color:'#87bba2'}}>
                                                    @{commit.username}
                                                </a>
                                        </Card.Title>
                                    </Row>

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

export default connect(mapStateToProps)(RawFeed);