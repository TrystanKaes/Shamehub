import React from 'react';
import './App.css';
<<<<<<< HEAD
import MovieHeader from './components/movieheader';
import Authentication from './components/authentication';
import ProfilePage from './components/profile';
import {HashRouter,Route} from 'react-router-dom';
=======
>>>>>>> origin
import { Provider } from 'react-redux'
import FrontPage from './frontPage'
import store from './stores/store'

function App() {
  return (
      <div className="App">
        <Provider store={store}>
<<<<<<< HEAD
          <HashRouter>
            <div>
              <MovieHeader />
              <Route exact path="/" render={()=><div />}/>
              <Route path="/signin" render={()=><Authentication />}/>
              <Route path="/profile" render={() => <ProfilePage />}/>
            </div>
          </HashRouter>
=======
            <FrontPage />
>>>>>>> origin
        </Provider>
      </div>
  );
}

export default App;
