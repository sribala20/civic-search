import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const Search = () => {
  const handleSearch = (e: any) => {
    console.log("Searching...");

    const formData = {
      name: e.target.elements.name.value,
      address: e.target.elements.address.value,
      city: e.target.elements.city.value,
      state: e.target.elements.state.value,
      zip: e.target.elements.zip.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      type: e.target.elements.type.value,
      incidentNumber: e.target.elements.incidentNumber.value,
      recordInfo: e.target.elements.recordInfo.value,
    };

    console.log(formData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("/api/v1/search/request", options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="search-page">
          <h1>Request for Public Records</h1>
          <div className="form-container">
            <form>
              <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Last, First" />
              </div>
              <div className="input-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" placeholder="Street & Unit #" />
                <input type="text" id="city" placeholder="City" />
                <input type="text" id="state" placeholder="State" />
                <input type="text" id="zip" placeholder="Zip" />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email" />
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" placeholder="Phone" />
              </div>
              <div className="input-group">
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" placeholder="Type" />
                <label htmlFor="incidentNumber">Incident Number:</label>
                <input
                  type="text"
                  id="incidentNumber"
                  placeholder="Incident Number"
                />
              </div>
              <div className="record-info">
                <h2>Record Information:</h2>
                <textarea placeholder="List the records you are requesting. Specify relevant information such as: subject, title, location, address, person(s) involved, project name, etc."></textarea>
              </div>
              <button type="submit" onClick={handleSearch}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
