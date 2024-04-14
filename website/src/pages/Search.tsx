import Navbar from "../components/Navbar";
import "../styles.css";

const Search = () => {
  return (
    <div>
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
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
