import React, { Component } from 'react';
import { Box, Flex } from 'rebass'
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

        return(
            <Flex
                sx={{
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                <Flex
                    sx={{
                        flex: 1,
                        flexDirection: [
                            'column',
                            'row'
                        ]
                    }}>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}>
                        Main Content
                    </Box>
                    <Box
                        sx={{
                            flexBasis: [
                                'auto',
                                64
                            ],
                            order: -1
                        }}>
                        Nav
                    </Box>
                    <Box
                        sx={{
                            flexBasis: [
                                'auto',
                                64
                            ]
                        }}>
                        Ads
                    </Box>
                </Flex>
                <Box>Footer</Box>
            </Flex>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Profile);