import React from "react";
import { Button, Form } from "react-bootstrap";
import "./styles.css";

function AdvSearch() {
  return (
    <div className="margin-30">
      <h3>Advanced Search</h3>
      <Button
        variant="success"
        href="/general-search"
        className="margin-bottom-20"
      >
        Switch to General Search
      </Button>
      <Form>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" className="form-control-w-75" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Incident Number</Form.Label>
          <Form.Control type="text" className="form-control-w-75" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Keywords</Form.Label>
          <Form.Control type="text" className="form-control-w-75" />
        </Form.Group>
        <Button variant="primary" type="submit" className="width-200">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default AdvSearch;
