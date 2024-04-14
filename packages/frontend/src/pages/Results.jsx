import NavBar from "./NavBar";
import SearchResults from "./SearchResult";

function Results() {
  return (
    <>
      <NavBar />
      <div style={{ margin: "30px", display: "flex", flexDirection: "column" }}>
        <h3>Results</h3>
        <ol>
          <SearchResults />
          <SearchResults />
          <SearchResults />
          <SearchResults />
          <SearchResults />
        </ol>
      </div>
    </>
  );
}

export default Results;
