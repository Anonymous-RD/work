import React, { useState } from "react";
import { readFile } from "../../../utils/fileUpload";
import { processCSV } from "../../../utils/csvProcessor";
import axios from "axios";
import Cookies from "js-cookie";

const BulkInvite = () => {
  const requiredFields = ["name" ]; // Manually defined required fields
  const [selectedField, setSelectedField] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file upload and processing
  const handleFileUpload = async () => {
    try {
      if (!file) throw new Error("Please upload a CSV file.");
      if (!selectedField) throw new Error("Please select a field to check for duplicates.");

      setLoading(true);

      readFile(file, (fileContent) => {
        const { headers, dataRows } = processCSV(fileContent, requiredFields);
        console.log("CSV Headers:", headers);
        console.log("CSV Data Rows:", dataRows);
        setUsers(dataRows);
      setLoading(false);
        
        alert("CSV file processed successfully.");
      });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  console.log("users Line No : 27",users);

  // Handle submitting processed users to the backend
  const handleSubmitUsers = async () => {
    try {
      if (users.length === 0) throw new Error("No users to process. Please upload a CSV file first.");

      setLoading(true);

    //   Make backend call to submit the users
      const response = await axios.post("https://us-central1-firecmsdemo.cloudfunctions.net/monitoring/flnset/bulkfln", {
        users,
        checkField: selectedField,
      },
    {
    headers: {
      "Content-Type": "application/json", // Specify the content type
      Authorization: `Bearer ${Cookies.get("token")}`, // Add authorization token if needed
    },}
    );

      console.log("Bulk invite result:", response.data);
      alert("Users submitted successfully!");
    } catch (error) {
      console.error("Error submitting users:", error.message);
      alert(`Failed to submit users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Bulk Invite</h1>
      <div>
        <label htmlFor="fileUpload">Upload CSV File:</label>
        <input
          type="file"
          id="fileUpload"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFileUpload} disabled={loading}>
          {loading ? "Processing..." : "Process File"}
        </button>
      </div>
      <div>
        <label htmlFor="checkField">Check duplicates by:</label>
        <select
          id="checkField"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="" disabled>
            Select a field
          </option>
          {requiredFields.map((field) => (
            <option key={field} value={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleSubmitUsers} disabled={loading}>
          {loading ? "Submitting..." : "Submit Users"}
        </button>
      </div>
    </div>
  );
};

export default BulkInvite;
