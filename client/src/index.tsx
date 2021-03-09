import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {createStore} from "redux"
import reducers from "./reducers"
import {WS} from "./Websocket"
import {BrowserRouter as Router, Route} from "react-router-dom";

// Components 
import Landing from "./components/Landing/Landing"
import Signup from "./components/UserForms/Signup"
import Login from "./components/UserForms/Login"

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <WS>
      <Router>
        <Route path="/" exact component={Landing}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={Login}/>
      </Router>
    </WS>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
