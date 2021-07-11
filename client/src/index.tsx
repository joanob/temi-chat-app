import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./reducers"
import { useStore } from "./hooks"

// Components 
import Landing from "./components/Landing"
import Signup from "./components/UserForms/Signup"
import Login from "./components/UserForms/Login"
import Home from "./components/Home"
import ContactList from "./components/ContactList"
import Chat from "./components/Chat"

const App = () => {
  const user = useStore(store => store.user.user)

  return (
    <Router>
      {user === null || user.id === 0 ?
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
        </Switch>
        :
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contacts" exact component={ContactList} />
          <Route path="/chat/:id" exact component={Chat} />
          <Route path="/login" exact component={
            () => {
              return <Redirect to="/" />
            }
          } />
        </Switch>
        }
      </Router>
  )

}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
