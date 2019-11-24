import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav-bar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateDocument from './components/createdocument';
import DocumentList from './components/listdocument';
import ViewDocument from './components/viewdocument';
import EditDocument from './components/editdocument';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar history={this.props.history} />
        <Switch>
          <Route path="/" exact render={props => <CreateDocument {...props} />} />
          <Route path="/documentlist" exact render={props => <DocumentList {...props} />} />
          <Route path="/viewdocument" exact render={props => <ViewDocument {...props} />} />
          <Route path="/editdocument" exact render={props => <EditDocument {...props} />} />          
          <Route path="/createdocument" exact 
          render={props => <CreateDocument {...props} />} />          
          }} />
        </Switch>
       
      </React.Fragment>
    )
  }
}


export default App;
