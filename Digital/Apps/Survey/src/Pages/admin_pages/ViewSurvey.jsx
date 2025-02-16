import React, { useState, useEffect } from "react";
import { Form } from "react-formio";
import { useLocation } from "react-router-dom";

export const ViewSurvey = () => {
  const location = useLocation(); // Get state from navigation
  const formBuilderData = location.state?.surveyCreatorData || {}; // Access data

  console.log("Received Data:", formBuilderData); // Log received data

  useEffect(() => {
    // Dynamically add Bootstrap CSS
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapLink);

    // Dynamically add Bootstrap Icons CSS
    const bootstrapIconsLink = document.createElement("link");
    bootstrapIconsLink.rel = "stylesheet";
    bootstrapIconsLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
    document.head.appendChild(bootstrapIconsLink);

    // Load Form.io script dynamically if not already present
    if (
      !document.querySelector(
        "script[src='https://cdn.form.io/js/formio.full.min.js']"
      )
    ) {
      const formioScript = document.createElement("script");
      formioScript.src = "https://cdn.form.io/js/formio.full.min.js";
      document.body.appendChild(formioScript);
    }
  });

  const [submissionData, setSubmissionData] = useState({});

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rendered Form</h2>

      {/* Render Form */}
      <Form
        form={formBuilderData} // Render the form schema
        onChange={(submission) => {
          console.log("Form Change:", submission.data);
        }}
        onSubmit={(submission) => {
          console.log("Form Submitted:", submission.data);
          setSubmissionData(submission.data);
        }}
      />

      <h3 className="mt-4 text-lg font-bold">Submitted Data:</h3>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(submissionData, null, 2)}
      </pre>
    </div>
  );
};
