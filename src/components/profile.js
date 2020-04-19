import React, { Component } from 'react';
import { Card , Row, Col, Container} from 'react-bootstrap'
import ProfileFeed from './profilefeed'
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
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };

    }

    componentDidMount() {

    }

    render() {
        const Repository = ({repo}) => {
            return(
                <div class="Floating-Card">
                    <Card style={{ minWidth: '11rem' }}>
                        <Card.Body>
                            <Card.Title>Repositories</Card.Title>
                            <Card.Text>
                                These are my repositories
                            </Card.Text>
                            <Card.Link href="#">Github Link</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
        const Profile = ({Profile}) => {
            return(
                <div class="Floating-Card">
                    <Card style={{ minWidth: '12rem', padding:10}}>
                        <Card.Body>
                            <Card.Img variant="top" src="https://sites.nicholas.duke.edu/clarklab/files/2011/01/default_profile-d80441a6f25a9a0aac354978c65c8fa9.jpg" />
                            <Card.Title>Username</Card.Title>
                            <Card.Subtitle>Real Name</Card.Subtitle>
                            <Card.Text>
                                Bio
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
                        {/* THIS IS THE LEFT PROFILE COLUMN */}
                        <Profile Profile={null}/>
                    </Col>
                    <Col xs={6}>
                        {/* THIS IS THE MAIN POST COLUMN */}
                            <ProfileFeed commits={commits}/>
                    </Col>
                    <Col>
                        {/* THIS IS THE RIGHT REPOSITORY COLUMN */}
                        <Repository repo={null}/>
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