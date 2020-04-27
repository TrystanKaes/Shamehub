import React, { Component } from 'react';
import {Row, Container, FormLabel, Button} from 'react-bootstrap'
import {fetchNewCommits, PostNewCommits} from '../../actions/userActions'
import Post from '../Utilities/post'
import Loading from '../Utilities/loading'
import { connect } from 'react-redux';

function DoesPostExist(arraytosearch, post){
    for (var i=0; i< arraytosearch.length; i++)
    {
        if (arraytosearch[i].commit_msg === post.commit_msg)
        {
            return i;
        }
    }
    return -1;
}

class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            postList : []
        };
        this.selectPost = this.selectPost.bind(this);
        this.post = this.post.bind(this);
    }

    selectPost(addedPost){

        let currentList = this.state.postList;

        var index = DoesPostExist(currentList, addedPost)

        if(index > -1){
            currentList.splice(index,1);
            this.setState({postList:currentList})
        }else{
            currentList.push(addedPost);
            this.setState({postList:currentList})
        }

        // alert(JSON.stringify(this.state.postList))

    }

    post(){
        const {dispatch} = this.props;
        dispatch(PostNewCommits(this.state.postList));
        this.props.goBack()
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchNewCommits());
    }

    render() {
        return(
            <div>
                {(this.props.loadingState === "") ?
                    <Container>
                        <div style={{height:10}}/>
                        <Row>
                        {(this.props.user.new_commits) ?
                            this.props.user.new_commits.map((post) =>
                                (((arraytosearch, post) =>{
                                    for (var i=0; i< arraytosearch.length; i++) {
                                        if(arraytosearch[i].commit_msg === post.commit_msg) {  return i;   }}
                                    return -1;})(this.state.postList,post) === -1)?
                                    <button className="Hidden-Post-Button-Unselected" onClick={() => this.selectPost(post)}>
                                        <Post commit={post}/>
                                    </button>
                                    :
                                    <button className="Hidden-Post-Button-Selected" onClick={() => this.selectPost(post)}>
                                        <Post commit={post}/>
                                    </button>

                            ) :
                            <h4 style={{flex:1, justifyContent:'center'}}>No new commits to post.<br/>Get to work!</h4>}
                </Row>
                            {(this.props.user.new_commits)?
                                <div style={{display: 'flex', justifyContent: 'center', padding: 10}} componentClass={FormLabel} sm={2}>
                                    <Button variant={this.props.theme} onClick={this.post}><h4>Post</h4></Button>
                                </div>
                            : ""}
                    </Container>
                    :
                    <Loading/>
                }
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
        user: state.user,
        loadingState: state.glob.loadingState,
    }
}


export default connect(mapStateToProps)(NewPost);