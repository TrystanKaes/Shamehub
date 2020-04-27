import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Col, Container, Row} from "react-bootstrap";

class DiscoverFeed extends Component {
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
            <div>
                <Container>
                    <Row>
                        <Col>
                        </Col>
                        <Col xs={6}>
                            This Is A Discovery Feed!
                            {/* THIS IS THE MAIN POST COLUMN */}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(DiscoverFeed);