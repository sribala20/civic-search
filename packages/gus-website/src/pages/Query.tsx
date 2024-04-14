import { useState } from "react";
import DocumentResult from "../components/DocumentResult";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles.css";

const Query = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    "Laserfische Location: City Council Agenda Packets/2010s/2018/2018-12-04/Council Reading Files/12-4-2018 Item 14 Reading File - Bicycle Transportation Plan:\nCity Bicycle Plan: Comprehensive Approach for Safe and Efficient Bicycling: The document outlines a comprehensive plan for promoting safe and efficient bicycling in the city, including guidelines for implementing bike lanes, signage, and maintenance procedures. It highlights the use of shared lane markings, volunteer programs for maintaining bike facilities, and the integration of bikeways into city planning and development activities. The plan specifically addresses the need to provide infrastructure and accommodations for bicyclists, aiming to increase bicycle trips and reduce incidents of improper bicycling practices.",
    "Laserfische Location: City Council Agenda Packets/2020s/2023/2023-02-11 - Goal Setting Workshop/Item 3a. 2023-25 City Council Goal Setting Workshop:\n2023-25 City Budget Priorities: Parking, Downtown Revitalization, and Recreation Enhancements: The document outlines community suggestions for the city's upcoming budget priorities, including offering low-cost parking permits for downtown, allocating funds wisely for public art projects, and adding recreational amenities like batting cages and bike trails; it also recommends improving traffic flow by removing automatic light pauses and requiring adequate parking for new developments, reflecting a focus on enhancing parking accessibility, boosting the downtown area, and expanding leisure options.",
    "Laserfische Location: City Council Agenda Packets/2020s/2023/2023-01-12 - Adjourned Meeting/Item 4a. 2023-25 Financial Plan Process, Economic Outlook, Budget Policies, and Capital Improvement Plan Review:\n2023-25 Community Priorities Survey Summary: The document contains public comments and suggestions for the City Council's consideration regarding top priorities for the 2023-25 fiscal years. Notable suggestions include offering low-cost parking permits for locals, allocating funds wisely for public projects, adding recreational amenities like batting cages and bike trails, and addressing concerns about traffic flow and parking availability in the city. Specific to parking, a suggestion is made to provide low-cost permits for locals to use 10-hour meters downtown to boost business, as well as ensure adequate parking is provided for new developments.",
    "Laserfische Location: City Council Agenda Packets/2020s/2023/2023-01-10 - Rescheduled Regular Meeting/Item 6b. 2023-25 Financial Plan Process, Economic Outlook, Budget Policies, and Capital Improvement Plan Review:\n2023-25 Community Priorities Survey Summary: The document outlines public feedback and suggestions for the City Council's priorities during the 2023-25 fiscal years, with a focus on parking-related initiatives. Notable recommendations include offering low-cost parking permits for locals to boost downtown business, allocating funds wisely for infrastructure projects, and expanding parking availability through measures such as restricting new development without adequate parking provisions. Directly addressing the search query, there are no specific details provided regarding funding allocation, financial plans, or parking permit costs for 2023 related to new parking projects.",
    "Laserfische Location: City Council Agenda Packets/2020s/2023/2023-01-10 - Rescheduled Regular Meeting/Item 6b. 2023-25 Financial Plan Process, Economic Outlook, Budget Policies, and Capital Improvement Plan Review:\nCity Council Meeting Summary: Priorities and Downtown Revitalization:\nThe city council meeting focused on revising goals and gathering public input on downtown revitalization and parking strategies. Notable discussions included changing goals to prioritize downtown vitality, housing accessibility, open space preservation, and public safety enhancements. Feedback highlighted concerns over confusing bike lanes, calls to support local downtown businesses, opposition to parking rate increases and parklets occupying parking spaces, and a desire to eliminate parking meters to promote downtown accessibility and vitality.",
  ]);

  const handleSearch = () => {
    fetch("http://localhost:8000/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <div className="query-page">
          <h1>General Information Request</h1>
          <div className="form-container">
            <div className="input-group">
              <textarea
                placeholder="Enter your request here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
            </div>
            <button onClick={handleSearch} type="submit">
              Submit Request
            </button>
          </div>
        </div>
      </div>
      <div>
        {searchResults.map((result, index) => (
          <DocumentResult key={index} data={result} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Query;
