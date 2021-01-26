import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Showcase from './components/Showcase/Showcase'
import AddProject from './components/AddProject/AddProject'
import TrackProject from './components/TrackProject/TrackProject'
import Guidelines from './components/Guidelines/Guidelines'
import SearchProjects from './components/SearchProjects/SearchProjects'
import Page404 from './components/Page404/Page404'

function App() {
  return (
    <div className='App'>
      <Nav />
      <div id='content'>
        <Router>
          <Switch>
            <Route exact path='/' component={Showcase} />
            <Route path='/add' component={AddProject} />
            <Route path='/track' component={TrackProject} />
            <Route path='/guidelines' component={Guidelines} />
            <Route path='/search' component={SearchProjects} />
            <Route path='/' component={Page404} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
