import NavBar from "./NavBar";

function AdvSearch() {
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
        <div
          style={{ margin: "30px", display: "flex", flexDirection: "column" }}
        >
          <h3>Advanced Search</h3>
          <a href="/">
            <button
              style={{ width: "300px", marginBottom: "20px" }}
              type="button"
              class="btn btn-success"
            >
              Switch to General Search
            </button>
          </a>

          <div style={{ marginBottom: "20px" }}>
            <h5>Type</h5>
            <input type="text" className="w-75 form-control" />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h5>Incident Number</h5>
            <input type="text" className="w-75 form-control" />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h5>Keywords</h5>
            <input type="text" className="w-75 form-control" />
          </div>

          <a href="/results">
            <button
              style={{ width: "200px" }}
              type="button"
              class="btn btn-primary"
            >
              Search
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default AdvSearch;
