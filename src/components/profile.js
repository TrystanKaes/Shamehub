import React, { Component } from 'react';
import { Box, Flex } from 'rebass'
import { Card } from 'react-bootstrap'
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
                <Card style={{ width: '10rem' }}>
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
                <Card style={{ width: '10rem' }}>
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
                            flex: 1,
                            minWidth: 0,
                            maxWidth: window.innerWidth/4 + window.innerWidth/2
                        }}>
                        Main Content
                    </Box>
                    {/* THIS IS THE LEFT PROFILE COLUMN */}
                    <Box
                        sx={{
                            flexBasis: [
                                'auto',
                                64
                            ],
                            order: -1,
                            maxWidth: window.innerWidth/2
                        }}
                        width={1/4}>
                        <Profile Profile={null}/>
                    </Box>
                    {/* THIS IS THE RIGHT REPOSITORY COLUMN */}
                    <Box sx={{
                            flexBasis: [
                                'auto',
                                64
                            ],
                            minWidth: 18,
                            maxWidth: window.innerWidth/2
                        }}
                         width={1/4}>
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