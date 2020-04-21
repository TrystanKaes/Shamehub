import React, { Component } from 'react';
import {Container, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
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
        {/* display username, commit message, repo, and timestamp. */}
        const CommitPosts = ({commits}) => {
            if(commits){
                return this.state.commits.map((commit) =>
                    <div style={{padding: 10}}>
                        <div style={{display: 'flex', justifyContent: 'center', shadow:1}}
                             class="Scrolling-Feed Post">
                        <Container>
                            <Row>
                                <Col>
                                    <a href={"https://github.com/" + commit.username}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       class="Username-Text">
                                        <h5>@{commit.username}</h5>
                                    </a>

                                </Col>
                                <Col>

                                </Col>
                                <Col>

                                </Col>

                            </Row>
                            <Row style={{justifyContent: 'center'}}>
                                <div class="Post-Text">{commit.message}</div>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="Repository-Text">
                                        Committed to: {commit.repo}
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                    <Col>

                                        <div style={{justifyContent: 'right'}}>
                                            <ButtonGroup sm={1} style={{padding: 15, alignItems:"#0f110c"}}>
                                                <Button style={{backgroundColor:"#87bba2",borderColor:"#0f110c"}}
                                                        onClick={()=>{alert("Like!")}}>like</Button>
                                                <Button style={{backgroundColor:"#c03221", borderColor:"#0f110c"}}
                                                        onClick={()=>{alert("Dislike!")}}>dislike</Button>
                                                <Button style={{backgroundColor:"#55828b", borderColor:"#0f110c"}}
                                                        onClick={()=>{alert("Comment!")}}>comment</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Col>
                                </Col>

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

    }
}

export default connect(mapStateToProps)(RawFeed);