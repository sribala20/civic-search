import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const UploadPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Uploading files...");

    if (!files) {
      console.error("No files selected!");
      return;
    }

    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    const options = {
      method: "POST",
      "Content-Type": "multipart/form-data",
      body: formData,
    };

    console.log("fetching... ");
    fetch("http://localhost:8080/api/v1/upload/document/", options)
      .then((data) => {
        console.log("Files uploaded successfully!");
        console.log(data);
        setFiles(null);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });

    setFiles(null);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="upload-page">
          <h1>Upload Files</h1>
          <div className="form-container">
            <form onSubmit={handleFileUpload}>
              <div className="input-group">
                <label htmlFor="fileInput">Select file(s) to upload:</label>
                <input type="file" id="fileInput" onChange={handleFileChange} />
              </div>
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;
