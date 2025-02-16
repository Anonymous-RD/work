import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createSurvey, updateSurveyById } from "@/api/api";
import { FormBuilder as FormBuilderIo, Form } from "react-formio";
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddSurvey = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const surveyToEdit = state?.surveyToEdit;
  const [formData, setFormData] = useState({
    name: "",
    status: "Draft",
    submissions: 0,
    formBuilderData: {},
    preferences: {
      districtAdmin: false,
      blockAdmin: false,
      schoolAdmin: false,
      mentors: false,
      teachers: false,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (surveyToEdit) {
      setFormData(surveyToEdit); // Pre-fill the form with existing survey data
    }
  }, [surveyToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveyCreatorChange = (data) => {
    setFormData((prev) => ({ ...prev, formBuilderData: data }));
  };

  const handlePreview = () => {
    if (
      !formData.formBuilderData ||
      Object.keys(formData.formBuilderData).length === 0
    ) {
      alert("Survey Creator Data is empty! Please add fields.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (surveyToEdit) {
        const { _id, createdAt, updatedAt, __v, ...filteredData } = formData;
        await updateSurveyById(surveyToEdit._id, filteredData);
      } else {
        await createSurvey(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error creating survey:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 mx-auto overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <label className="block text-sm font-medium text-gray-700">
            Survey Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-900"
            placeholder="Enter a Survey Name"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-900"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="flex space-x-2">
          {/* {formData.status === "Published" && (
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Survey URL copied to clipboard!");
              }}
              className="px-5 py-3 bg-sky-900 text-white font-semibold rounded-xl"
            >
              Copy URL
            </button>
          )} */}
          <button
            type="button"
            onClick={handlePreview}
            className="px-5 py-3 bg-sky-900 text-white font-semibold rounded-xl"
          >
            Preview Survey
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-3 bg-sky-900 text-white font-semibold rounded-xl"
          >
            {surveyToEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* Survey Creator Section */}
      <div className="border-t border-gray-200 py-4">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Build Survey Form
        </h3>
        <div>
          <FormBuilderIo
            form={formData.formBuilderData}
            onChange={(schema) => handleSurveyCreatorChange(schema)}
          />
        </div>
        {isModalOpen && (
          <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Survey Preview</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <Form form={formData.formBuilderData} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
