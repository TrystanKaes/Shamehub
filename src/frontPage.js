import React, {Component} from 'react';
import './App.css';
import MovieHeader from './components/appHeader';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import Feed from './components/feed';
import Profile from './components/profile'
import WelcomeBanner from './components/welcomebanner'

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: false
        };
        this.handleTimer = this.handleTimer.bind(this)
    }
    handleTimer(){
        this.setState({enter: true})
    }
    render() {
        return (
            <div>
                <script>
                    {setTimeout(this.handleTimer, 1000)}
                </script>

                <HashRouter>
                        <div>
                            {this.state.enter ?
                                <MovieHeader /> :
                                <WelcomeBanner />}
                            <Route exact path="/" render={() => <div/>}/>
                            <Route path="/welcome" render={() => <WelcomeBanner/>}/>
                            <Route path="/signin" render={() => <Authentication/>}/>
                            <Route path="/profile" render={() => <Profile/>}/>
                            <Route path="/feed" render={() => <Feed/>}/>
                        </div>
                </HashRouter>
            </div>
        )
    }
}

export default FrontPage;
