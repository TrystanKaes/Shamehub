import React, { Component } from 'react';
import {Container, Row, Col, Button, FormLabel, FormControl, FormGroup, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import darkLogo from '../../assets/back-arrow-dark.svg';
import lightLogo from '../../assets/back-arrow-light.svg';
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

class ExpandPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            comment: '',

        };
        this.postComment = this.postComment.bind(this);
        this.updateDetails = this.updateDetails.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    componentWillUnmount() {

    }

    updateDetails(event){
        this.setState({
            comment: event.target.value,
        });
    }

    postComment() {
        // const {dispatch} = this.props;
        // dispatch(postComment(this.state.comment));
        alert(`You should go tell ${this.props.selectPost.author_name},"${this.state.comment}" yourself because... I actually can't.`)
    }

    handleClick(){
        alert("click")
    }

    render() {
        const theme = {
            PostText: (this.props.theme === 'dark') ? 'Post-Text-Dark' : 'Post-Text-Light',
            DateText: (this.props.theme === 'dark') ? 'Date-Text-Dark' : 'Date-Text-Light',
            UsernameText: (this.props.theme === 'dark') ? 'Username-Text-Dark' : 'Username-Text-Light',
            PostCardType: (this.props.theme === 'dark') ? 'Post-Card-Dark' : 'Post-Card-Light',
            RepositoryText: (this.props.theme === 'dark') ? 'Repository-Text-Dark' : 'Repository-Text-Light',
            CommentSection: (this.props.theme === 'dark') ? 'Comment-Section-Dark' : 'Comment-Section-Light',
            BackArrow: (this.props.theme === 'dark') ? darkLogo : lightLogo,
        }

        return(
            <Container>
                <Row>
                    <Col></Col>
                    <Link to={localStorage.getItem("return")}>
                        <img src={theme.BackArrow} alt="back" style={{width:30,height:30}}/>
                    </Link>
                    <Col sm={6}>
                        {/*onClick={this.handleClick.bind(this)}*/}
                        <div style={{padding: 10, flex:1}}>
                            <div style={{display: 'flex', justifyContent: 'center', shadow: 1}}
                                 className={theme.PostCardType}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <a href={"https://github.com/" + this.props.selectPost.author_name}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               className={theme.UsernameText}>
                                                <h5>@{this.props.selectPost.author_name}</h5>
                                            </a>

                                        </Col>
                                        <Col></Col>
                                        <Col></Col>
                                        <div className={theme.DateText}>{timeAgo.format(new Date(this.props.selectPost.commit_date))}</div>
                                    </Row>
                                    <Row style={{justifyContent: 'center'}}>
                                        <div className={theme.PostText}>{this.props.selectPost.commit_msg}</div>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className={theme.RepositoryText}>
                                                Committed to: {this.props.selectPost.repo_name}
                                            </div>
                                        </Col>
                                        <Col></Col>
                                        <Col></Col>
                                        <div className="Post-Buttons flex-wrap">
                                            <Button style={{backgroundColor: "#87bba2", borderColor: "#0f110c"}}
                                                    onClick={() => {
                                                        alert("Like!")
                                                    }}>like({Math.floor(Math.random()*20)})</Button>
                                            <Button style={{backgroundColor: "#c03221", borderColor: "#0f110c"}}
                                                    onClick={() => {
                                                        alert("Dislike!")
                                                    }}>dislike({Math.floor(Math.random()*5)})</Button>
                                            <Button style={{backgroundColor: "#55828b", borderColor: "#0f110c"}}
                                                    onClick={() => {
                                                        alert("Comment!")
                                                    }}>comment({Math.floor(Math.random()*3)})</Button>
                                        </div>
                                        <div className="h-divider"/>
                                    </Row>
                                    <div className={theme.CommentSection}>
                                        {theseAreComments.sort((a, b) => {
                                            return new Date(b.date) - new Date(a.date)
                                        }).map((comment)=>
                                            <Container>
                                                <Row>
                                                    <a href={"https://github.com/" + comment.username}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className={theme.UsernameText}>
                                                        <h5>@{comment.username}</h5>
                                                    </a>
                                                    <Col sm={12}
                                                         style={{flex:1,justifyContent:'center'}}
                                                         className={theme.PostText}>
                                                        {comment.comment}
                                                    </Col>
                                                    <div className={theme.DateText}>{timeAgo.format(new Date(comment.date))}</div>
                                                </Row>
                                                <div className="h-divider" style={{height:2}}/>
                                            </Container>
                                        )}
                                    </div>
                                    <Form horizontal="true">
                                        <FormGroup controlId="comment">
                                            <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                                                <FormControl style={{width: window.innerWidth / 4}}
                                                             onChange={this.updateDetails}
                                                             value={this.state.comment}
                                                             type="comment"
                                                             placeholder="comment"/>{" "}
                                                <Button variant={this.props.theme} bg={this.props.theme} onClick={this.postComment}>Post</Button>
                                            </div>
                                        </FormGroup>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
        selectPost: state.glob.selectedPost,
    }
}


export default connect(mapStateToProps)(ExpandPost);


// if(this.props.selectedPost === null){
//     var getUrl = window.location;
//     var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
//     window.location.href = baseUrl;
// }