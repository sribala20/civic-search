import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Query from "./pages/Query";
import Search from "./pages/Search";
import Upload from "./pages/Upload";

function App() {
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => children;

  const AdminRoute = ({ children }: { children: JSX.Element }) => children;

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/query"
              element={
                <ProtectedRoute>
                  <Query />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <AdminRoute>
                  <Upload />
                </AdminRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
