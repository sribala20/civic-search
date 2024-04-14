import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function GenSearch() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4">General Search</h3>
          <Button
            as={Link}
            to="/advanced-search"
            variant="outline-success"
            className="mb-4"
          >
            Switch to Advanced Search
          </Button>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Prompt</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default GenSearch;
