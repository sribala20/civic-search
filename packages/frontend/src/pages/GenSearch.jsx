import NavBar from "./NavBar";

function GenSearch() {
  const containerStyle = {
    backgroundColor: "#F3F2F2",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Adding a light shadow for depth
  };

  return (
    <>
      <NavBar />
      <div style={containerStyle}>
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        <h3>General Search</h3>
        <a href="/advanced-search">
          <button
            type="button"
            className="btn btn-success"
            style={{ marginBottom: "20px" }}
          >
            Switch to Advanced Search
          </button>
        </a>
          <h5>Prompt</h5>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ marginBottom: "20px" }}
          ></textarea>
          <a href="/results">
            <button
              style={{ width: "200px" }}
              type="button"
              className="btn btn-primary"
            >
              Search
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default GenSearch;
