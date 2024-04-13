import NavBar from "./NavBar";

function AdvSearch() {
  return (
    <>
      <NavBar />
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
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
    </>
  );
}

export default AdvSearch;
