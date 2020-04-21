import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/appHeader';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux'
import Profile from './components/profile'
import WelcomeBanner from './components/welcomebanner'
import UserFeed from './components/userfeed'
import DiscoverFeed from './components/discoverfeed'
import Home from './components/home'

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: true
        };
        this.handleTimer = this.handleTimer.bind(this)
    }
    handleTimer(){
        this.setState({enter:true});
    }
    render() {
        return (

            <div>
                <script>{setTimeout(this.handleTimer, 1000)}</script>
                <HashRouter>
                        <div>
                            {this.state.enter ?
                                <AppHeader /> :
                                <WelcomeBanner />}
                            <Route path="/home" render={() => <Home/>}/>
                            <Route exact path="/" render={() => <Home/>}/>
                            <Route path="user/:username" Component={<Profile/>}/>
                            <Route path="/welcome" render={() => <WelcomeBanner/>}/>
                            <Route path="/profile" render={() => <div className="Fade-In"><Profile/></div>}/>
                            <Route path="/userfeed" render={() => <div className="Fade-In"><UserFeed/></div>}/>
                            <Route path="/discover" render={() => <div className="Fade-In"><DiscoverFeed/></div>}/>
                            <Route path="/signin" render={() => <div className="Fade-In"><Authentication/></div>}/>
                        </div>
                </HashRouter>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(FrontPage);
