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
import ExpandPost from "./components/Utilities/expandpost";
import Home from './components/AppBuilders/home'
import {Button} from "react-bootstrap";
import {changeTheme} from "./actions/globalActions";
import PublicProfile from "./components/publicprofile";

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
        document.body.style.backgroundColor = (this.props.theme === 'dark') ? '#0f110c' : '#fff'
        return (
        <div className={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
            <div className="App">
                <script>{setTimeout(this.handleTimer, 1000)}</script>
                <HashRouter>
                        <div className={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                            {this.state.enter ?
                                <AppHeader /> :
                                <WelcomeBanner />}
                            <Route path="/home" render={() => <Home/>}/>
                            <Route exact path="/" render={() => <Home/>}/>
                            <Route path="/welcome" render={() => <Home/>}/>
                            <Route path="/profile" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/publicUser" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/profilesettings" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/userfeed" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/discover" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/signin" render={() => <div className="Fade-In"><Home/></div>}/>
                            <Route path="/ColorWheelGame" render={() => <div className="Fade-In"><ColorWheelGame/></div>}/>
                            <Route path="/post" render={() => <div className="Fade-In"><Home/></div>}/>
                        </div>
                </HashRouter>
            </div>
            <div className="Toggle-Button">
                <Button onClick={()=>{this.props.dispatch(changeTheme())}}
                    variant={(this.props.theme === 'dark') ? 'light' : 'dark'}
                    style={{width:30, height:30, borderRadius:50}}>
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
