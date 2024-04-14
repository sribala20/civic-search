import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const NoPermissionPage = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="no-permission-page">
          <div className="content-section">
            <h1>Access Denied</h1>
            <p>
              You do not have permission to access this page. Please contact the
              administrator if you believe this is an error or{" "}
              <a href="/login">login</a> to access this page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoPermissionPage;
