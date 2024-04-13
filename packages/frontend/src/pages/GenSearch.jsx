import NavBar from "./NavBar";

function GenSearch() {
  return (
    <>
      <NavBar />
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        <h3>General Search</h3>
        <a href="/advanced-search">
          <button
            type="button"
            class="btn btn-success"
            style={{ marginBottom: "20px" }}
          >
            Switch to Advanced Search
          </button>
        </a>
        <h5>Prompt</h5>

        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          style={{ marginBottom: "20px" }}
        ></textarea>

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

export default GenSearch;
