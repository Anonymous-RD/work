import { fetchSurveyById, submitSurvey } from "@/api/api";  // Assuming you have submitSurvey API function.
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-formio";

const HomePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResponse, setFormResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetchSurveyById(id);
        setFormData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };
    fetchSurvey();
  }, [id]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Prepare the data to be sent to the backend API
      const payload = {
        surveyName: formData.name,  // Passing the survey name
        formData: data,  // Passing the form data (fields filled in by the user)
      };
  
      // Send the data to the backend
      const response = await submitSurvey(payload);
  
      // Handle the response
      if (response?.message) {
        setFormResponse(response);
        alert("Survey submitted successfully!");
        navigate("/");  // Redirect to a thank you page or another page after submission
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("There was an error submitting the survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl  font-semibold text-center mb-6">
        {formData.name}
      </h1>

      <Form
        form={formData.formBuilderData}
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      />
      {/* <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Back to Home
        </button>
      </div> */}
    </div>
  );
};

export default HomePage;
