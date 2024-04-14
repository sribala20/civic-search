import React, { useState } from "react";
import NavBar from "./NavBar";

function GenSearch() {
  const containerStyle = {
    backgroundColor: "#F3F2F2",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();

  const handleSearch = () => {
    fetch("http://localhost:8000/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: searchText,
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
    <>
      <NavBar />
      <div style={containerStyle}>
        <div
          style={{ margin: "30px", display: "flex", flexDirection: "column" }}
        >
          <h3>General Search</h3>
          <h5>Prompt</h5>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ marginBottom: "20px" }}
            value={searchText} // Bind the value of the textarea to the search text state
            onChange={(e) => setSearchText(e.target.value)} // Update the search text state on change
          ></textarea>
          <button
            style={{ width: "200px" }}
            type="button"
            className="btn btn-primary"
            onClick={handleSearch} // Add onClick event handler
          >
            Search
          </button>
          <div style={{ marginTop: "20px" }}>
            {searchResults &&
              searchResults.map((result, index) => (
                <div key={index} style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}>
                  <p>{result}</p>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GenSearch;
