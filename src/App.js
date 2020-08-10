import React from "react";
import Hero from "./Hero";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hero} />
      </Switch>
    </Router>
  );
};

export default App;
