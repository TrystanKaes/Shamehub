import React, { Component } from 'react';
import { Card , Row, Col, Container, ListGroup } from 'react-bootstrap'
import RawFeed from './rawfeed'
import { connect } from 'react-redux';


const commits = [
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },
    {
        username: "CHARLIE",
        message: "OMg this is not working well.",
        repo: "FailedStudent",
        time: "1 hour ago"
    },
    {
        username: "Tony",
        message: "Finally!!!!!",
        repo: "ASDASD",
        time: "2 hours ago"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up.",
        repo: "oolala",
        time: "13 minutes ago"
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG",
        repo: "WadaWada",
        time: "now"
    },


]

const reposi = ["Repository 1", "Repository 2", "Repository 3", "Repository 4"]
const profileState = {
    // profile_username: localStorage.getItem("username"),
    profile_username: localStorage.getItem("username"),
    profile_img: "https://support.plymouth.edu/kb_images/Yammer/default.jpeg",
    // profile_name: localStorage.getItem("name"),
    profile_name: localStorage.getItem("name"),
    profile_bio: "This right here is a pretty dope bio and so I shall put it here.",
    commits: commits,
    repos: reposi,
}

class Profile extends Component {
    constructor(props){
        // if(props.match.params.username){
        //     profileState.profile_username = props.match.params.username;
        // }
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            githubLink : "https://github.com/" + profileState.profile_username
        };
    }

    componentDidMount() {

    }

    render() {

        const Repository = ({repositories, link}) => {
            return(
                <div class="Hidden-Card" style={{padding: 10 }}>
                    <Card bg={this.props.theme} style={{
                        minWidth: '11rem',
                        borderRadius: 30,
                        borderColor: (this.props.theme === 'dark') ? '#c03221' : '#55828b'}}>
                        <Card.Body>
                            <Card.Title class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}><h3>Repositories</h3></Card.Title>
                            <Card.Text>
                                    { repositories ?
                                        repositories.map((repo) =>
                                            <ListGroup.Item as={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                                                <a href={link + "/" + repo}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   style={{color:'#c03221'}}>
                                                    <h5 style={{color:(this.props.theme === 'dark') ? '#87bba2' : '#55828b'}}>
                                                        {repo}
                                                    </h5>
                                                </a>
                                            </ListGroup.Item>)
                                        :
                                        "No Repos found"
                                    }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        const Profile = ({Profile, link}) => {
            return(
                <div class={(this.props.theme === 'dark') ? 'Floating-Card' : 'Floating-Card Drop-Shadow-Dark'}>
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
                            <Card.Text class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                                {Profile.bio}
                            </Card.Text>
                        </Card.Body>
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
                            <Repository repositories={this.props.details.repo_names} link={this.state.githubLink}/>
                        </Col>
                        <Col xs={6}>
                            {/* THIS IS THE MAIN POST COLUMN */}
                                <RawFeed commits={this.props.details.posts.sort((a,b)=>{
                                    return new Date(b.commit_date) - new Date(a.commit_date)
                                })}/>
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
        user: state.user,
        details: state.user.fe_repo_info
    }
}


export default connect(mapStateToProps)(Profile);