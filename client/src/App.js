import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Landing from './views/Landing';
import Movie from './views/Movie';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/title" component={Movie} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
