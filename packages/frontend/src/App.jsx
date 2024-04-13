import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdvSearch from "./pages/AdvSearch.jsx";
import GenSearch from "./pages/GenSearch.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GenSearch />}></Route>
          <Route path="/advanced-search" element={<AdvSearch />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
