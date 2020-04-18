import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {Thumbnail, Col, Grid, Row, Image, Form, FormGroup, FormControl, ControlLabel, Button, } from 'react-bootstrap';
import './profile.css'
import {SketchPicker} from "react-color";

class ProfilePage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            profile_img: 'https://avatars0.githubusercontent.com/u/38296555?s=460&u=bb9f6a164da5ed1f58851f84871556d6ead241c4&v=4',
            name: 'Frenchy',
            github_link: 'https://github.com/xFrenchy'
        }
    }

    render(){
        return (
            <div className="profile">
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <Thumbnail src={this.state.profile_img} className="profilePicture">
                                <h4 className="profileName"> {this.state.name} </h4>
                                <a className="profileLink" href={this.state.github_link}> github page </a>
                                <p className ="profileBio">
                                    bio goes here.<br />
                                    Just a normal girl, looking for a normal guy.<br />
                                    I love going out and also staying in.<br />
                                    I love my friends and family.<br />
                                    No shirtless selfies or hookups.<br />
                                    Love animals, country walks and music.<br />
                                    I'm 35 and still love Disney cartoons.<br />
                                    If you want to know about me, just ask me.<br />
                                </p>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(ProfilePage)