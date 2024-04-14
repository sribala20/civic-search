import "../styles.css";

const DocumentResult = ({ data }: { data: any }) => {
  // Extract the location and description from the string
  const [location, description] = data.split(":\n");
  const title = description.split(":")[0];

  return (
    <div className="document-result">
      <h3 className="document-title">{title}</h3>
      <p className="document-location">{location}</p>
      <p className="document-description">
        {description.split(": ").slice(1).join(": ")}
      </p>
    </div>
  );
};

export default DocumentResult;
