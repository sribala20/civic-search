import React from "react";
import { ListGroup } from "react-bootstrap";
import SearchResult from "./SearchResult";
import "./styles.css";

function Results() {
  return (
    <div className="margin-30">
      <h3>Results</h3>
      <ListGroup>
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
      </ListGroup>
    </div>
  );
}

export default Results;
