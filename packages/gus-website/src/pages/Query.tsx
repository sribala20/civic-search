import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const Query = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Process the query with an LLM
    console.log("Query:", query);
    // Reset the query state after processing
    setQuery("");
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="query-page">
          <h1>General Information Request</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <textarea
                  placeholder="Enter your request here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
              </div>
              <button type="submit">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Query;
