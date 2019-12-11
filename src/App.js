import React from 'react';
import './App.css';
import Customerlist from './components/customer/Customerlist'
import Traininglist from './components/training/Traininglist'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
            <Link style = {{color: "white", textDecoration: "none"}} to ="/">Personal Trainer</Link>{''}
            </Typography>
            <Typography style = {{marginLeft: 30}} variant="h6">
            <Link style = {{color: "white", textDecoration: "none"}} to ="/trainings">All Trainings</Link>{''}
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
            <Route exact path = "/" component = {Customerlist} />
            <Route path ="/trainings" component ={Traininglist} />
            <Route render ={() => <h1>Page not found</h1>} />
        </Switch>

      </BrowserRouter>
      
    </div>
  );
}

export default App;



