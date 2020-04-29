import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "./Utilities/post";
import Loading from './Utilities/loading'
import { LoadState, fetchDiscoverFeed } from "../actions/globalActions";
import { Col, Container, Row } from "react-bootstrap";

class Discoverfeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            lastScroll: Date.now(),
        };
        this.scrolledtobottom = this.scrolledtobottom.bind(this)
        window.addEventListener('scroll', this.scrolledtobottom);
    }

    componentDidMount() {
        // const { dispatch } = this.props;
        // dispatch(fetchDiscoverFeed(0))
        localStorage.setItem('return', '/discover');
    }


    scrolledtobottom(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            if (this.props.discoverfeed.length <= 0 ||  localStorage.getItem('DiscoverFetch') - Date.now() > 5000) {
                const {dispatch} = this.props;
                dispatch(fetchDiscoverFeed(parseInt(this.props.discoverfeed.length))).then(dispatch(LoadState('')));
                this.setState({lastScroll:Date.now()})
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolledtobottom);
    }

    render() {

        return(
            <Container>
                <Row>
                    <Col>
                        {/* THIS IS THE SOMETHING */}

                    </Col>
                    <Col xs={6}>
                        {/* THIS IS THE MAIN POST COLUMN */}
                        <div>
                            {(this.props.loadingState === "") ?
                                <div>
                                    {/*<button onClick={this.fetchFeed.bind(this)}>FETCH USER FEED</button>*/}
                                    {this.props.discoverfeed.sort((a, b) => {
                                        return new Date(b.commit_date) - new Date(a.commit_date)
                                    }).map((post, i) =>
                                        <Post key={i}  commit={post}/>
                                    )}
                                    <h6>End of Feed</h6>
                                </div>
                                :
                                <div>
                                    {this.props.discoverfeed.sort((a, b) => {
                                        return new Date(b.commit_date) - new Date(a.commit_date)
                                    }).map((post, i) =>
                                        <Post key={i} commit={post}/>
                                    )}
                                    <Loading/>
                                </div>
                            }
                        </div>
                    </Col>
                    <Col>
                        {/* I Don't know what this is for anymore. Ads? */}
                    </Col>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = state => {
    return {
        discoverfeed: state.glob.discoverfeed,
        loadingState: state.glob.loadingState
    }
}

export default connect(mapStateToProps)(Discoverfeed);