import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdvSearch from "./pages/AdvSearch.jsx";
import GenSearch from "./pages/GenSearch.jsx";
import Results from "./pages/Results.jsx";
import Upload from "./pages/Upload.jsx";
class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GenSearch />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/advanced-search" element={<AdvSearch />}></Route>
          <Route path="/general-search" element={<GenSearch />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
