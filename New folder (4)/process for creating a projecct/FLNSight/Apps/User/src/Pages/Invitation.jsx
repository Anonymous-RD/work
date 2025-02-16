import { useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import axios from "axios";
import { auth } from "../firebase";



function Invitation() {
  const [mode, setMode] = useState("single"); // Toggle between single and bulk
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  // Handle single user invitation
  const handleSingleInvite = async () => {
    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
 
      await axios.post("https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/invite",{
        name,email,role
      })

      const tempPassword = "Temp@12345"; // You can generate a random password
      await createUserWithEmailAndPassword(auth, email, tempPassword);

      await sendPasswordResetEmail(auth, email);

      console.log("Single user created:", { name, email, role });
      alert(`Invitation sent successfully to ${email}!`);
    } catch (error) {
      console.error("Error inviting user:", error.message);
      alert(`Failed to invite user: ${error.message}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle bulk user invitation
  const handleBulkInvite = async () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    setLoading(true); // Start loading

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      const rows = text.split("\n").map((row) => row.trim()).filter((row) => row !== "");
      const headers = rows[0].split(",").map((header) => header.trim().toLowerCase());

      const requiredFields = ["name", "email", "role"];
      const missingFields = requiredFields.filter((field) => !headers.includes(field));

      if (missingFields.length > 0) {
        alert(`The following required fields are missing: ${missingFields.join(", ")}`);
        setLoading(false); // End loading if fields are missing
        return;
      }

      const dataRows = rows.slice(1).map((row) => {
        const columns = row.split(",").map((col) => col.trim()).filter((col) => col !== "");

        if (columns.length !== headers.length) {
          console.error(`Row length mismatch. Expected ${headers.length} columns but got ${columns.length}`);
          return null;
        }

        return columns;
      }).filter((row) => row !== null);

      const users = dataRows.map((row) => {
        const user = {};
        row.forEach((col, index) => {
          user[headers[index]] = col;
        });
        return user;
      });

      console.log("Users to be invited:", users);

      try {

        await axios.post("https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/bulkinvite",users);
        for (const user of users) {
          const { email, name, role } = user;

          if (!email || !name || !role) {
            console.error("Invalid user data:", user);
            continue;
          }

          const tempPassword = "Temp@12345"; // Temporary password
          await createUserWithEmailAndPassword(auth, email, tempPassword);
          await sendPasswordResetEmail(auth, email);

          console.log("Bulk user created:", user);
        }

        alert("All invitations sent successfully!");
      } catch (error) {
        console.error("Error inviting bulk users:", error.message);
        alert(`Failed to invite bulk users: ${error.message}`);
      } finally {
        setLoading(false); // End loading
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("There was an error reading the file.");
      setLoading(false); // End loading on error
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>User Invitation</h2>
      {/* <BulkInvite/> */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setMode("single")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: mode === "single" ? "#007bff" : "#ccc",
            color: mode === "single" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Single Invitation
        </button>
        <button
          onClick={() => setMode("bulk")}
          style={{
            padding: "10px 20px",
            backgroundColor: mode === "bulk" ? "#007bff" : "#ccc",
            color: mode === "bulk" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          Bulk Invitation
        </button>
      </div>

      {mode === "single" && (
        <div>
          <h3>Single Invitation</h3>
          <div style={{ marginBottom: "10px" }}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Role: </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role"
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
          <button
            onClick={handleSingleInvite}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Sending..." : "Send Invitation"}
          </button>
        </div>
      )}

      {mode === "bulk" && (
        <div>
          <h3>Bulk Invitation</h3>
          <div style={{ marginBottom: "10px" }}>
            <label>Upload CSV File: </label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
          <button
            onClick={handleBulkInvite}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Processing..." : "Upload and Process"}
          </button>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Processing your request...</p>
          <div className="spinner"></div> {/* You can add a spinner here */}
        </div>
      )}
    </div>
  );
}

export default Invitation;
