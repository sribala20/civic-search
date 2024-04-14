import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const LandingPage = () => {
  const { loggedIn } = useAuth();

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="landing-page">
          <div className="hero-section">
            <h1>Welcome to San Luis Obispo</h1>
            <p>Discover the charm and beauty of our vibrant city.</p>
          </div>
          <div className="content-section">
            <h2>About San Luis Obispo</h2>
            <p>
              San Luis Obispo, or SLO as it's affectionately known, is a
              picturesque city located along the Central Coast of California.
              With its historic downtown, world-class wineries, and stunning
              natural scenery, it's a destination that truly has something for
              everyone.
            </p>
            <p>
              Explore our charming neighborhoods, enjoy farm-to-table cuisine,
              and immerse yourself in the unique culture that makes San Luis
              Obispo so special. Whether you're a visitor or a resident, our
              city is sure to capture your heart.
            </p>
            {loggedIn && (
              <div className="button-container">
                <Link to="/query" className="btn btn-primary">
                  General Information Request
                </Link>
                <Link to="/search" className="btn btn-primary">
                  Request for Public Records
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
