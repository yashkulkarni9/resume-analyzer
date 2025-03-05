import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(
        "https://79tcovlydg.execute-api.us-east-1.amazonaws.com/dev",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response);
      setMessage("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error.response ? error.response.data : error.message);
      setMessage("Upload failed. Please try again.");
    }
};


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Resume Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Resume</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
