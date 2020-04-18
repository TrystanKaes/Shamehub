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
            enter: false
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
                            <Route exact path="/" render={() => <div/>}/>
                            <Route path="/welcome" render={() => <WelcomeBanner/>}/>
                            <Route path="/home" render={() => <Home/>}/>
                            <Route path="/profile" render={() => <Profile/>}/>
                            <Route path="/userfeed" render={() => <UserFeed/>}/>
                            <Route path="/discover" render={() => <DiscoverFeed/>}/>
                            <Route path="/signin" render={() => <Authentication/>}/>

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
