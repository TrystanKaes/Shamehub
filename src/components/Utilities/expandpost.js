import React, { Component } from 'react';
import {Container, Row, Col, Button, FormLabel, FormControl, FormGroup, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import darkLogo from '../../assets/back-arrow-dark.svg';
import lightLogo from '../../assets/back-arrow-light.svg';
import { addCommentDiscover } from '../../actions/globalActions'
import { addCommentUser } from '../../actions/userActions'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

/* display username, commit message, repo, and timestamp. */


class ExpandPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            comment: '',
            like: 0,
            dislike: 0,
            postedComment: []

        };
        this.postComment = this.postComment.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);

    }

    handleLike(){
        if(this.state.like === 1){
            this.setState({like:0})
        }else{
            if(this.state.dislike == 1){
                this.setState({dislike:0})
            }
            this.setState({like:1})
        }
    }

    handleDislike(){
        if(this.state.dislike === 1){
            this.setState({dislike:0})
        }else{
            if(this.state.like == 1){
                this.setState({like:0})
            }
            this.setState({dislike:1})
        }
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
        // alert(`You should go tell ${this.props.selectPost.author_name},"${this.state.comment}" yourself because... I actually can't.`)

        let comment = {
            username: localStorage.getItem("username"),
            date: Date.now(),
            comment: this.state.comment,
        }

        // this.setState({
        //     postedComment: [{
        //         username: localStorage.getItem("username"),
        //         date: Date.now(),
        //         comment: this.state.comment,
        //     }]
        // })
        this.setState({
            isLoaded: true
        })

        const {dispatch} = this.props;

        if(localStorage.getItem('return') === '/profile'){
            dispatch(addCommentUser(this.props.selectPost,comment))
        }else{
            dispatch(addCommentDiscover(this.props.selectPost,comment))
        }


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
                                                        onClick={this.handleLike}>
                                                    like({this.props.selectPost.likes + this.state.like})</Button>
                                                <Button style={{backgroundColor: "#c03221", borderColor: "#0f110c"}}
                                                        onClick={this.handleDislike}>
                                                    dislike({this.props.selectPost.dislikes + this.state.dislike})</Button>
                                                <Button style={{backgroundColor: "#55828b", borderColor: "#0f110c"}}
                                                        onClick={this.handleClick}>comment({this.props.selectPost.comments.length})</Button>
                                        </div>
                                        <div className="h-divider"/>
                                    </Row>
                                    <div className={theme.CommentSection}>
                                        {this.state.postedComment.concat(this.props.selectPost.comments).sort((a, b) => {
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