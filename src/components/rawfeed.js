import React, { Component } from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { connect } from 'react-redux';

/* display username, commit message, repo, and timestamp. */


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
                    <div style={{padding: 10}}>
                        <div style={{display: 'flex', justifyContent: 'center', shadow:1}}
                             class={(this.props.theme === 'dark') ? 'Post-Card-Dark' : 'Post-Card-Light'}>
                        <Container>
                            <Row>
                                <Col>
                                    <a href={"https://github.com/" + commit.username}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       class={(this.props.theme === 'dark') ? 'Username-Text-Dark' : 'Username-Text-Light'}>
                                        <h5>@{commit.username}</h5>
                                    </a>

                                </Col>
                                <Col>

                                </Col>
                                <Col>

                                </Col>

                            </Row>
                            <Row style={{justifyContent: 'center'}}>
                                <div class={(this.props.theme === 'dark') ? 'Post-Text-Dark' : 'Post-Text-Light'}>{commit.message}</div>
                            </Row>
                            <Row>
                                <Col>
                                    <div class={(this.props.theme === 'dark') ? 'Repository-Text-Dark' : 'Repository-Text-Light'}>
                                        Committed to: {commit.repo}
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                    <Col>
                                    </Col>
                                </Col>
                                <div className="Post-Buttons">
                                    <ButtonGroup sm={1} style={{padding: 15, alignItems: "#0f110c"}}>
                                        <Button style={{backgroundColor: "#87bba2", borderColor: "#0f110c"}}
                                                onClick={() => {
                                                    alert("Like!")
                                                }}>like</Button>
                                        <Button style={{backgroundColor: "#c03221", borderColor: "#0f110c"}}
                                                onClick={() => {
                                                    alert("Dislike!")
                                                }}>dislike</Button>
                                        <Button style={{backgroundColor: "#55828b", borderColor: "#0f110c"}}
                                                onClick={() => {
                                                    alert("Comment!")
                                                }}>comment</Button>
                                    </ButtonGroup>
                                </div>
                            </Row>
                        </Container>
                        </div>
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
        theme: state.glob.theme,
    }
}

// class={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}
// class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}

export default connect(mapStateToProps)(RawFeed);