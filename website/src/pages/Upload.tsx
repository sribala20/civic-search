import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const UploadPage = () => {
  const handleFileUpload = (e: any) => {
    // Handle file upload logic here
    console.log("File uploaded:", e.target.files[0]);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="upload-page">
          <h1>Upload Files</h1>
          <div className="form-container">
            <form>
              <div className="input-group">
                <label htmlFor="fileInput">Select file(s) to upload:</label>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={handleFileUpload}
                />
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
