import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const LoginPage = () => {
  const [email, setEm] = useState("");
  const [password, setPa] = useState("");

  const { setLoggedIn, setAdmin } = useAuth();

  const memberEm = "member@slocity.org";
  const memberPa = "password";

  const adminEm = "admin@slocity.org";
  const adminPa = "password";

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (email === memberEm && password === memberPa) {
      setLoggedIn && setLoggedIn(true);
      alert("Logged in as member");
      return;
    }

    if (email === adminEm && password === adminPa) {
      setLoggedIn && setLoggedIn(true);
      setAdmin && setAdmin(true);
      alert("Logged in as admin");
      return;
    }

    alert("Invalid email or password");
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="login-page">
          <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEm(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPa(e.target.value)}
                  required
                />
              </div>
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
