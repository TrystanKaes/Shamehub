import React, { Component } from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

/* display username, commit message, repo, and timestamp. */


class Post extends Component {
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
        const theme = {
            PostText: (this.props.theme === 'dark') ? 'Post-Text-Dark' : 'Post-Text-Light',
            DateText: (this.props.theme === 'dark') ? 'Date-Text-Dark' : 'Date-Text-Light',
            UsernameText: (this.props.theme === 'dark') ? 'Username-Text-Dark' : 'Username-Text-Light',
            PostCardType: (this.props.theme === 'dark') ? 'Post-Card-Dark' : 'Post-Card-Light',
            RepositoryText: (this.props.theme === 'dark') ? 'Repository-Text-Dark' : 'Repository-Text-Light',
        }


        return(
            <div style={{padding: 10, flex:1}}>
                <div style={{display: 'flex', justifyContent: 'center', shadow: 1}}
                     className={theme.PostCardType}>
                    <Container>
                        <Row>
                            <Col>
                                <a href={"https://github.com/" + this.props.commit.author_name}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={theme.UsernameText}>
                                    <h5>@{this.props.commit.author_name}</h5>
                                </a>

                            </Col>
                            <Col>

                            </Col>
                            <Col>
                            </Col>
                            <div className={theme.DateText}>{timeAgo.format(new Date(this.props.commit.commit_date))}</div>
                        </Row>
                        <Row style={{justifyContent: 'center'}}>
                            <div className={theme.PostText}>{this.props.commit.commit_msg}</div>
                        </Row>
                        <Row>
                            <Col>
                                <div className={theme.RepositoryText}>
                                    Committed to: {this.props.commit.repo_name}
                                </div>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <div className="Post-Buttons flex-wrap">
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
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
    }
}


export default connect(mapStateToProps)(Post);