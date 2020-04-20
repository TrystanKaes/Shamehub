import React, { Component } from 'react';
import { Card , Row, Col, Container, ListGroup } from 'react-bootstrap'
import RawFeed from './rawfeed'
import { connect } from 'react-redux';


const commits = [
    {
        username: "CHARLIE",
        message: "OMg this is not working well."
    },
    {
        username: "Tony",
        message: "Finally!!!!!"
    },
    {
        username: "Jessica",
        message: "I think this is finally looking up."
    },
    {
        username: "Trystan",
        message: "ASDFKHJSDAFUYFKHAADUFHKYFUALDFKGHJLADHFKG"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },
    {
        username: "Ben",
        message: "commit 17"
    },

]
const reposi = ["Repository 1", "Repository 2", "Repository 3", "Repository 4"]
const profileState = {
    // profile_username: localStorage.getItem("username"),
    profile_username: "TrystanKaes",
    profile_img: "https://support.plymouth.edu/kb_images/Yammer/default.jpeg",
    // profile_name: localStorage.getItem("name"),
    profile_name: "Trystan Kaes",
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
                    <Card style={{ minWidth: '11rem', borderRadius:30, borderColor: '#55828b'}}>
                        <Card.Body>
                            <Card.Title><h3>Repositories</h3></Card.Title>
                            <Card.Text>
                                <div>
                                <ListGroup>
                                    { repositories ?
                                        repositories.map((repo) =>
                                            <ListGroup.Item>
                                                <a href={link + "/" + repo}
                                                   target="_blank"
                                                   rel="noopener noreferrer"
                                                   style={{color:'#c03221'}}>
                                                    <h5>{repo}</h5>
                                                </a>
                                            </ListGroup.Item>)
                                        :
                                        "No Repos found"
                                    }
                                </ListGroup>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        const Profile = ({Profile, link}) => {
            return(
                <div class="Floating-Card Drop-Shadow">
                    <Card style={{ minWidth: '12rem', padding:10, borderRadius:30, borderColor: '#c03221'}}>
                        <Card.Body>
                            <Card.Title>
                                <a href={link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{color:'#55828b'}}>
                                    <h1>{Profile.profile_username}</h1>
                                </a>
                            </Card.Title>
                            <Card.Img style={{padding:10, borderRadius: "50%"}} variant="top" src={Profile.profile_img}  />
                            <Card.Subtitle style={{color: "#87bba2"}}>{Profile.profile_name}</Card.Subtitle>
                            <Card.Text>
                                {Profile.profile_bio}
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
                            <Profile Profile={profileState} link={this.state.githubLink}/>
                            <Repository repositories={profileState.repos} link={this.state.githubLink}/>
                        </Col>
                        <Col xs={6}>
                            {/* THIS IS THE MAIN POST COLUMN */}
                                <RawFeed commits={profileState.commits}/>
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

    }
}

export default connect(mapStateToProps)(Profile);