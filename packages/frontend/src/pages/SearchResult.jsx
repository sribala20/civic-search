function SearchResult() {
  return (
    <>
      <li>
        <h3 style={{marginBottom: "20px"}}>FileName</h3>
        <button
          style={{ width: "200px", marginBottom: "20px"}}
          type="button"
          class="btn btn-primary"
        >
          View Duplicates
        </button>
        <h5 style={{marginBottom: "10px"}}>
          slkfasjdflkjsadlkfjlsadkjflkdsjaflkjsadlfjlksdjflkjdsaflkasdjflkjdsalkfjlasdkjflksdjf
          alksdjflkjasdlkjflkasjdflkjllksdanflkjdslkfjlkdsjflkdsjalkfjdslkafjlkadsjfljasdlkfjasd
          aslkdfjlkasdjflkjsadlkfjlksadjflkjsdlfkjsdlfkjasdlkjlkfjlasfjlksdajflksjdlkfjdslkfjds
          laksdjflkasdjflkjdsl
        </h5>
        <a href="/images/myw3schoolsimage.jpg" download="w3logo">
          <h5>Download File</h5>
        </a>
      </li>
    </>
  );
}

export default SearchResult;
