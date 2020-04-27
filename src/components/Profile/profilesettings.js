import React, { Component } from 'react';
import {Card, Row, Col, Container, FormGroup, FormLabel, FormControl, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import darkSettings from "../../assets/dark-settings.svg";
import lightSettings from "../../assets/light-settings.svg";
import {LoadState} from "../../actions/globalActions";
import { submitProfileUpdate, syncProfile } from "../../actions/userActions";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            details:{
                username: this.props.user.username,
                bio: this.props.user.bio,
                name: this.props.user.name,
            },
            error : null,
            isLoaded : true,
            githubLink : "https://github.com/" + this.props.user.username,
            rotate: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);
        this.syncWithGithub = this.syncWithGithub.bind(this)
    }

    componentDidMount() {

    }


    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    syncWithGithub() {
        const {dispatch} = this.props;
        dispatch(LoadState('Updating profile'))
        dispatch(syncProfile(this.state.details));
    }

    submit() {
        const {dispatch} = this.props;
        dispatch(LoadState('Updating profile'))
        dispatch(submitProfileUpdate(this.state.details));
    }

    handleClick(){
        this.setState({rotate:!this.state.rotate})
    }

    render() {
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
                        <Link to="/profile">
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
                    <Col sm={5}>
                        {/* THIS IS THE LEFT PROFILE AND REPOSITORY COLUMN */}
                        <Profile Profile={this.props.user} link={this.state.githubLink}/>
                    </Col>
                        <Form vertical>
                            <div style={{height:100}}></div>
                            <FormGroup controlId="name">
                                <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                                    <div className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                                        <h3>Name</h3>
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                                    <FormControl style={{width: window.innerWidth / 4}}
                                                 onChange={this.updateDetails}
                                                 value={this.state.details.name}
                                                 type="name"
                                                 placeholder="Name"/>
                                </div>
                            </FormGroup>
                            <FormGroup controlId="bio">
                                <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                                    <div className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                                        <h3>Bio</h3>
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                                    <FormControl style={{width: window.innerWidth/4,}}
                                                 as="textarea"
                                                 onChange={this.updateDetails}
                                                 value={this.state.details.bio}
                                                 type="bio"
                                                 placeholder="bio" />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                                    <Button variant="secondary" onClick={this.syncWithGithub}> Sync With Github</Button>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                                    <Button variant="secondary" onClick={this.submit}> Save</Button>
                                </div>
                            </FormGroup>
                        </Form>
                </Row>
                <div style={{height:window.innerHeight}}></div>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
        user: state.user,
    }
}


export default connect(mapStateToProps)(Profile);