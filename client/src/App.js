import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Landing from './views/Landing';
import Movie from './views/Movie';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function loginChange(boolean) {
    setLoggedIn(boolean);
  }

  return (
    <Router>
      <Navbar onLoginChange={loginChange} />
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/title">
            <Movie loggedIn={loggedIn} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
