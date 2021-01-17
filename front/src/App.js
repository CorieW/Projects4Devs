import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav'
import AddProject from './components/AddProject/AddProject'

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Switch>
          <Route path="/add" component={AddProject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
