import React from 'react';
import './App.css';
import MovieHeader from './components/appHeader';
import Authentication from './components/authentication';
import {HashRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import Feed from './components/feed';
import Profile from './components/profile'
import store from './stores/store'

function App() {
  return (
      <div className="App">
        <Provider store={store}>
          <HashRouter>
            <div>
              <MovieHeader />
              <Route exact path="/" render={()=><div />}/>
              <Route path="/signin" render={()=><Authentication />}/>
              <Route path="/profile" render={()=><Profile />}/>
              <Route path="/feed" render={()=><Feed />}/>
            </div>
          </HashRouter>
        </Provider>
      </div>
  );
}

export default App;
