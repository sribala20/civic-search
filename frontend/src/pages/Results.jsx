import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import SearchResult from "./SearchResult";

function Results() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4">Results</h3>
          <ListGroup>
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Results;
