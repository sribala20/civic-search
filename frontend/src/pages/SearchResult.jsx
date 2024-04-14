import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import "./styles.css";

function SearchResult() {
  return (
    <ListGroup.Item>
      <h5>FileName</h5>
      <Button variant="primary" className="margin-bottom-20">
        View Duplicates
      </Button>
      <p>Description goes here...</p>
      <a href="/images/myw3schoolsimage.jpg" download="w3logo">
        <p>Download File</p>
      </a>
    </ListGroup.Item>
  );
}

export default SearchResult;
