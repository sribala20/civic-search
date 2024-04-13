import NavBar from "./NavBar";

function Upload() {
  return (
    <>
      <NavBar />
      <div
        style={{
          margin: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          style={{ margin: "10px 30px 40px 150px" }}
          type="file"
          id="myFile"
          name="filename"
        />
        <input style={{ width: "200px" }} type="submit"></input>
      </div>
    </>
  );
}

export default Upload;
