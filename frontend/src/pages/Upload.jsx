import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Upload() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">Upload</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.File id="exampleFormControlFile1" label="Choose file" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Upload
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
