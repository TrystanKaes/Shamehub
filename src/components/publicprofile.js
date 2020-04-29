import React, { Component } from 'react';
import { Card , Row, Col, Container, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import UserFeed from './userfeed';
import NewPost from './newpost';
import darkSettings from "../../assets/dark-settings.svg";
import lightSettings from "../../assets/light-settings.svg";
import {fetchNewCommits, fetchUserFeed} from "../../actions/userActions";

class PublicProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            githubLink : "https://github.com/" + this.props.user.username,
            rotate: true,
            makePosts: false,
        };
        this.showMakePost = this.showMakePost.bind(this);
    }

    showMakePost(){
        this.setState({makePosts:!this.state.makePosts})
        const { dispatch } = this.props;
        dispatch(fetchNewCommits());
        dispatch(fetchUserFeed(0))
    }

    componentDidMount() {
        this.setState({rotate:!this.state.rotate})
    }

    render() {

        const Repository = ({repositories, link}) => {
            return(
                <div className="Hidden-Card" style={{padding: 10 }}>
                    <Card bg={this.props.theme} style={{
                        minWidth: '11rem',
                        borderRadius: 30,
                        borderColor: (this.props.theme === 'dark') ? '#c03221' : '#55828b'}}>
                        <Card.Body>
                            <Card.Title className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}><h3>Repositories</h3></Card.Title>
                            <h5 style={{color:(this.props.theme === 'dark') ? '#87bba2' : '#55828b'}}>
                                { repositories ?
                                    repositories.map((repo, i) =>
                                        <ListGroup.Item  key={i} as={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                                            <a href={link + "/" + repo}
                                               target="_blank"
                                               rel="noopener noreferrer"
                                               style={{color:'#c03221'}}>
                                                <h5>
                                                    {repo}
                                                </h5>
                                            </a>
                                        </ListGroup.Item>)
                                    :
                                    "No Repos found"
                                }
                            </h5>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        const Profile = ({Profile, link}) => {
            return(
                <div className={(this.props.theme === 'dark') ? 'Floating-Card' : 'Floating-Card Drop-Shadow-Dark'}>
                    <Card  bg={this.props.theme}
                           style={{
                               minWidth: '12rem',
                               padding:10,
                               borderRadius:30,
                               backgroundColor: (this.props.theme === 'dark') ? '#0f110c' : '#ffffff',
                               borderColor: (this.props.theme === 'dark') ? '#55828b' : '#c03221',
                           }}>
                        <Card.Body>
                            <Card.Title>
                                <a href={link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{color:'#55828b'}}>
                                    <h1>{Profile.github_username}</h1>
                                </a>
                            </Card.Title>
                            <Card.Img style={{padding:10, borderRadius: "50%"}} variant="top" src={Profile.profile_img}  />
                            <Card.Subtitle style={{color: "#87bba2"}}><h5>{Profile.name}</h5></Card.Subtitle>
                            <Card.Text className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                                {Profile.bio}
                            </Card.Text>
                        </Card.Body>
                        <Link to="profilesettings">
                            <img className={(this.state.rotate) ? 'Settings Rotate' : 'Settings'}
                                 src={(this.props.theme === 'dark') ? darkSettings : lightSettings}
                                 alt="Loading icon"
                                 onClick={this.handleClick} />
                        </Link>
                    </Card>
                </div>
            )
        }
        return(
            <Container>
                <Row>
                    <Col>
                        {/* THIS IS THE LEFT PROFILE AND REPOSITORY COLUMN */}
                        <Profile Profile={this.props.user} link={this.state.githubLink}/>
                        {(this.props.repo_names)?
                            < Repository repositories={this.props.user.repo_names} link={this.props.user.githubLink}/>
                            :
                            ""
                        }
                    </Col>
                    <Col xs={6}>
                        {/* THIS IS THE MAIN POST COLUMN */}
                        <Button variant={this.props.theme}
                                style={{flex:1, border:2}}
                                onClick={this.showMakePost}>
                            <h3>{(this.state.makePosts)? "Go back":"Update your friends on your new work!"}</h3>
                        </Button>
                        {(this.state.makePosts) ?
                            <NewPost goBack={this.showMakePost}/> :
                            <UserFeed/>
                        }
                        {/*    <RawFeed commits={this.props.details.posts.sort((a,b)=>{*/}
                        {/*        return new Date(b.commit_date) - new Date(a.commit_date)*/}
                        {/*    })}/>*/}
                    </Col>
                    <Col>
                        {/* I Don't know what this is for anymore. Ads? */}
                        {/*<Repository repositories={profileState.repos} link={this.state.githubLink}/>*/}
                    </Col>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
        selectedUser: state.glob.selectedUser,
    }
}


export default connect(mapStateToProps)(PublicProfile);