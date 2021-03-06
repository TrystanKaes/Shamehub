import React, { Component } from 'react';
import {FormLabel, Button} from 'react-bootstrap'
import {fetchNewCommits, PostNewCommits} from '../../actions/userActions'
import NewPostCard from './newpostcard'
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

    // componentWillUnmount() {
    //     window.addEventListener('scroll', this.scrolledtobottom);
    // }

    componentDidMount() {
        window.removeEventListener('scroll', this.scrolledtobottom);
        const { dispatch } = this.props;
        dispatch(fetchNewCommits());
    }

    render() {
        return(
            <div>
                {(this.props.loadingState === "") ?
                    <div style={{flex:1}}>
                        <div style={{height:10,flex:1}}/>
                        {(this.props.user.new_commits) ?
                            this.props.user.new_commits.map((post) =>
                                (((arraytosearch, post) =>{
                                    for (var i=0; i< arraytosearch.length; i++) {
                                        if(arraytosearch[i].commit_msg === post.commit_msg) {  return i;   }}
                                    return -1;})(this.state.postList,post) === -1)?
                                        <button class="Hidden-Post-Button-Unselected" onClick={() => this.selectPost(post)}>
                                            <NewPostCard commit={post} newPost={true}/>
                                        </button>
                                    :
                                        <button class="Hidden-Post-Button-Selected" onClick={() => this.selectPost(post)}>
                                            <NewPostCard commit={post} newPost={true}/>
                                        </button>

                            ) :
                            <h4 style={{flex:1, justifyContent:'center'}}>No new commits to post.<br/>Get to work!</h4>}
                            {(this.props.user.new_commits)?
                                <div style={{display: 'flex', justifyContent: 'center', padding: 10}} componentClass={FormLabel} sm={2}>
                                    <Button variant={this.props.theme} onClick={this.post}><h4>Post</h4></Button>
                                </div>
                            : ""}
                    </div>
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