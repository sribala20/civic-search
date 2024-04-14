import React from "react";
import { Button, ListGroup } from "react-bootstrap";

function SearchResult() {
  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-center">
        <h5>FileName</h5>
        <Button variant="outline-primary">View Duplicates</Button>
      </div>
      <p className="my-3">Description goes here...</p>
      <a
        href="/images/myw3schoolsimage.jpg"
        download="w3logo"
        className="text-decoration-none"
      >
        Download File
      </a>
    </ListGroup.Item>
  );
}

export default SearchResult;
