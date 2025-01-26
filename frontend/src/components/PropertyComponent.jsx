import React from "react";

const Property = () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="http://localhost:8501"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Streamlit App"
      ></iframe>
    </div>
  );
};

export default Property;
