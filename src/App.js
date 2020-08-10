import React from "react";
import Hero from "./Hero";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app"
import "firebase/firestore"
import { firebaseConfig } from "./Config"
import "./App.css";

const App = () => {
  firebase.initializeApp(firebaseConfig)
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hero} />
      </Switch>
    </Router>
  );
};

export default App;
