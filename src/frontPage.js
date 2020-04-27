import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppBuilders/appHeader';
import Authentication from './components/AppBuilders/AuthenticationHandling/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux'
import Profile from './components/Profile/profile'
import WelcomeBanner from './components/AppBuilders/welcomebanner'
import UserFeed from './components/Profile/userfeed'
import DiscoverFeed from './components/discoverfeed'
import ColorWheelGame from './components/AppBuilders/ColorWheelGame'
import ProfileSettings from './components/Profile/profilesettings'
import Home from './components/AppBuilders/home'
import {Button} from "react-bootstrap";
import {changeTheme} from "./actions/globalActions";

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
        <div class={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
            <div className="App">
                <script>{setTimeout(this.handleTimer, 1000)}</script>
                <HashRouter>
                        <div class={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                            {this.state.enter ?
                                <AppHeader /> :
                                <WelcomeBanner />}
                            <Route path="/home" render={() => <Home/>}/>
                            <Route exact path="/" render={() => <Home/>}/>
                            <Route path="user/:username" Component={<Profile/>}/>
                            <Route path="/welcome" render={() => <WelcomeBanner/>}/>
                            <Route path="/profile" render={() => <div className="Fade-In"><Profile/></div>}/>
                            <Route path="/profilesettings" render={() => <div className="Fade-In"><ProfileSettings/></div>}/>
                            <Route path="/userfeed" render={() => <div className="Fade-In"><UserFeed/></div>}/>
                            <Route path="/discover" render={() => <div className="Fade-In"><DiscoverFeed/></div>}/>
                            <Route path="/signin" render={() => <div className="Fade-In"><Authentication/></div>}/>
                            <Route path="/ColorWheelGame" render={() => <div className="Fade-In"><ColorWheelGame/></div>}/>
                        </div>
                </HashRouter>
            </div>
            <div className="Toggle-Button">
                <Button onClick={()=>{this.props.dispatch(changeTheme())}}
                    variant={(this.props.theme === 'dark') ? 'light' : 'dark'}
                    style={{width:30, height:30, borderRadius:50}}
                    class={(this.props.theme === 'dark') ? 'Drop-Shadow-Light' : 'Drop-Shadow-Light'}>
                </Button>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme,
    }
}

export default connect(mapStateToProps)(FrontPage);
