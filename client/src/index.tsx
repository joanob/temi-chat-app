import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore} from "redux"
import { Provider } from "react-redux";
import reducers from "./reducers"

// Router
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"

// Connection
import {WS} from "./Websocket"

// Components 
import Landing from "./components/Landing"
import Signup from "./components/UserForms/Signup"
import Login from "./components/UserForms/Login"
import Home from "./components/Home"
import ContactList from "./components/ContactList"
import Chat from "./components/Chat"

ReactDOM.render(
  <Provider store={createStore(reducers, {},
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())}>
    <WS>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/contacts" exact component={ContactList} />
          <ProtectedRoute path="/chat/:id" exact component={Chat} />
        </Switch>
      </Router>
    </WS>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
