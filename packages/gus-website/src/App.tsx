import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Landing from "./pages/Landing";
import Query from "./pages/Query";
import Search from "./pages/Search";
import Upload from "./pages/Upload";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/query" element={<Query />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
