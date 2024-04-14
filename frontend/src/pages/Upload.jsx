import React from "react";
import { Button, Form } from "react-bootstrap";
import "./styles.css";

function Upload() {
  return (
    <div className="margin-30">
      <h3>Upload</h3>
      <Form style={{ margin: "0 auto", width: "300px" }}>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Choose file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default Upload;
