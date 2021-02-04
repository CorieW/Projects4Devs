import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Showcase from './components/Showcase/Showcase'
import AddProject from './components/AddProject/AddProject'
import TrackProject from './components/TrackProject/TrackProject'
import Guidelines from './components/Guidelines/Guidelines'
import SearchProjects from './components/SearchProjects/SearchProjects'
import Page404 from './components/Page404/Page404'
import Project from './components/Project/Project'

function App() {
  return (
    <div className='app'>
      <Nav />
      <div id='content-container'>
        <Router>
          <Switch>
            <Route exact path='/' component={Showcase} />
            <Route path='/project' component={Project} />
            <Route path='/add' component={AddProject} />
            <Route path='/track' component={TrackProject} />
            <Route path='/guidelines' component={Guidelines} />
            <Route path='/results' component={SearchProjects} />
            <Route path='/' component={Page404} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
