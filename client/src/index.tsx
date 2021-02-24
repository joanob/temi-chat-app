import React from 'react';
import ReactDOM from 'react-dom';
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Components 
import Landing from "./components/Landing/Landing"

ReactDOM.render(
    <Router>
      <Route path="/" exact component={Landing}/>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
