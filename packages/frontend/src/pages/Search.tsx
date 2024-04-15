import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [type, setType] = useState("");
  const [incidentNumber, setIncidentNumber] = useState("");
  const [recordInfo, setRecordInfo] = useState("");

  const handleSearch = () => {
    console.log("Searching...");

    const formData = {
      type,
      incidentNumber,
      recordInfo,
    };

    console.log(JSON.stringify(formData));

    fetch("http://localhost:8000/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `public record type is ${type}, incident number is ${incidentNumber}, additional record info is ${recordInfo}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="search-page">
          <h1>Request for Public Records</h1>
          <div className="form-container">
            <div className="input-group">
              <label htmlFor="type">Type:</label>
              <input
                type="text"
                id="type"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="incidentNumber">Incident Number:</label>
              <input
                type="text"
                id="incidentNumber"
                placeholder="Incident Number"
                value={incidentNumber}
                onChange={(e) => setIncidentNumber(e.target.value)}
              />
            </div>
            <div className="record-info">
              <h2>Record Information:</h2>
              <textarea
                placeholder="List the records you are requesting. Specify relevant information such as: subject, title, location, address, person(s) involved, project name, etc."
                value={recordInfo}
                onChange={(e) => setRecordInfo(e.target.value)}
              ></textarea>
            </div>
            <button onClick={handleSearch}>Submit Request</button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {searchResults &&
          searchResults.map((result, index) => (
            <div
              key={index}
              style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}
            >
              <p>{result}</p>
              <hr />
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
