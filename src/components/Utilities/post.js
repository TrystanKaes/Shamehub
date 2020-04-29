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
const theseAreComments = [
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 2000),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 30000),
        comment: "Great Job Friend!",
    },
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 99000),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 123000),
        comment: "Great Job Friend!",
    },
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 2012300),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 200300),
        comment: "Great Job Friend!",
    },
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 2000),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 90000),
        comment: "Great Job Friend!",
    },
    {
        username: "Timothy",
        date: Date.now(),
        comment: "I always knew you could do it.",
    },
    {
        username: "Tomothy",
        date: new Date(Date.now() - 2000),
        comment: "Took long enough",
    },
    {
        username: "Samantha",
        date: new Date(Date.now() - 781234),
        comment: "Great Job Friend!",
    },
]

class Post extends Component {
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
                                    <Link to={localStorage.getItem("return")}>
                                        <Button style={{backgroundColor: "#87bba2", borderColor: "#0f110c"}}
                                                onClick={() => {
                                                    alert("Like!")
                                                }}>like({Math.floor(Math.random()*20)})</Button>
                                    </Link>
                                    <Link to={localStorage.getItem("return")}>
                                        <Button style={{backgroundColor: "#c03221", borderColor: "#0f110c"}}
                                                onClick={() => {
                                                    alert("Dislike!")
                                                }}>dislike({Math.floor(Math.random()*5)})</Button>
                                    </Link>
                                    <Link to="/post" className="NoSelect">
                                        <Button style={{backgroundColor: "#55828b", borderColor: "#0f110c"}}
                                                onClick={this.handleClick}>comment({Math.floor(Math.random()*3)})</Button>
                                    </Link>
                                </div>
                            </Row>
                            <div className="h-divider"/>
                            {(theseAreComments.length > 2) ?
                                <Link to="/post">
                                    <div className={theme.RepositoryText}
                                         style={{flex:1,justifyContent:'center', fontSize:10}}
                                         onClick={this.handleClick}>
                                        View all comments<br/>. . .
                                    </div>
                                </Link>     :   ""}
                            <div className={theme.CommentSection}>
                                {theseAreComments.sort((a, b) => {
                                    return new Date(b.date) - new Date(a.date)
                                }).slice(0,2).map((comment,i)=>
                                    <Container>
                                        <Row>
                                                <h5 className={theme.UsernameText}
                                                    style={{fontSize:10}}>
                                                    @{comment.username}</h5>
                                            <Col sm={12}
                                                 style={{flex:1,justifyContent:'center',fontSize:9}}
                                                 className={theme.PostText}>
                                                {comment.comment}
                                            </Col>
                                            <div className={theme.DateText}>{timeAgo.format(new Date(comment.date))}</div>
                                        </Row>{(i === 0)?<div className="h-divider" style={{height:2}}/>:""}
                                    </Container>
                                )}
                            </div>
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