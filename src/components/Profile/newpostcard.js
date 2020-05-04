import React, { Component } from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import { selectPost } from '../../actions/globalActions'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

/* display username, commit message, repo, and timestamp. */

class NewPostCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            commits: props.commits,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

    }

    handleClick(){
        const { dispatch } = this.props;
        dispatch(selectPost(this.props.commit))
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


export default connect(mapStateToProps)(NewPostCard);