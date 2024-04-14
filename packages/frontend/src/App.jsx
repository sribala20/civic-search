import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdvSearch from "./pages/AdvSearch.jsx";
import GenSearch from "./pages/GenSearch.jsx";
import Upload from "./pages/Upload.jsx";
import Results from "./pages/Results.jsx";
import { backendRoot } from "./AppConfig.jsx";
class App extends Component {
  render() {
    function fetch_query() {
      const search = "Tell me about parking regulations in downtown";
      //const encodedSearch = encodeURIComponent(search);
      const url = `${backendRoot}/retrieve`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: search }),
      })
        .then((r) => r.json())
        .then((data) => console.log(data));
    }

    return (
      <Router>
        <Routes>
          <Route path="/" element={<GenSearch />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/advanced-search" element={<AdvSearch />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </Router>
    );
  }
}
export default App;
