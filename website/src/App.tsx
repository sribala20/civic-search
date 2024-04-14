import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Query from "./pages/Query";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/query" element={<Query />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
