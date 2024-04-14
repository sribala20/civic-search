import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdvSearch() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4">Advanced Search</h3>
          <Button as={Link} to="/" variant="outline-success" className="mb-4">
            Switch to General Search
          </Button>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Incident Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keywords</Form.Label>
              <Form.Control type="text" />
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

export default AdvSearch;
