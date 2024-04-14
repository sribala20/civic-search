import React from "react";
import { Button, Form } from "react-bootstrap";
import "./styles.css";

function GenSearch() {
  return (
    <div className="margin-30">
      <h3>General Search</h3>
      <Button
        variant="success"
        href="/advanced-search"
        className="margin-bottom-20"
      >
        Switch to Advanced Search
      </Button>
      <Form>
        <Form.Group>
          <Form.Label>Prompt</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit" className="width-200">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default GenSearch;
