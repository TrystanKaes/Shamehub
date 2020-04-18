import React, { Component } from 'react';
import { Box, Flex } from 'rebass'
import { Card } from 'react-bootstrap'
import PostCard from './postcard'
import { connect } from 'react-redux';

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
                <Card style={{ minWidth: '11rem' }}>
                    <Card.Body>
                        <Card.Title>Repositories</Card.Title>
                        <Card.Text>
                            These are my repositories
                        </Card.Text>
                        <Card.Link href="#">Github Link</Card.Link>
                    </Card.Body>
                </Card>
            )
        }
        const Profile = ({Profile}) => {
            return(
                <Card style={{ minWidth: '12rem' }}>
                    <Card.Body>
                        <Card.Img variant="top" src="https://sites.nicholas.duke.edu/clarklab/files/2011/01/default_profile-d80441a6f25a9a0aac354978c65c8fa9.jpg" />
                        <Card.Title>Username</Card.Title>
                        <Card.Subtitle>Real Name</Card.Subtitle>
                        <Card.Text>
                            Bio
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }
        return(
                <Flex
                    sx={{
                        flex: 1,
                        flexDirection: [
                            'column',
                            'row'
                        ]
                    }}>
                    {/* THIS IS THE MAIN POST COLUMN */}
                    <Box
                        sx={{
                            flex: 1/2 + 1/4 + 1/8,
                            minWidth: 0,
                            align: 'center'
                            // maxWidth: window.innerWidth/4 + window.innerWidth/2
                        }}>
                        main content here
                    </Box>
                    {/* THIS IS THE LEFT PROFILE COLUMN */}
                    <Box
                        sx={{
                            flexBasis: [
                                'auto',
                                64
                            ],
                            order: -1,
                            padding: 3
                        }}>
                        <Profile Profile={null}/>
                    </Box>
                    {/* THIS IS THE RIGHT REPOSITORY COLUMN */}
                    <Box sx={{
                            flexBasis: [
                                'auto',
                                64
                            ],
                            minWidth: 18,
                        }}>
                        <Repository repo={null}/>
                    </Box>
            </Flex>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Profile);