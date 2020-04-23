import React, { Component } from 'react';
import { connect } from 'react-redux';
// import RawFeed from "./rawfeed";
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
                            {/*<RawFeed commits={commits}/>*/}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>
                <div style={{height:window.innerHeight}}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(DiscoverFeed);