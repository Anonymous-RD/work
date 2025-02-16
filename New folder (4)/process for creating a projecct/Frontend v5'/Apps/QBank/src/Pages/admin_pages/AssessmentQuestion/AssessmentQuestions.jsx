import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../../redux/slices/assessmentQuestionsSlice";
import { Modal, Button, Form } from "react-bootstrap";
import "./as.css";

const AssessmentQuestions = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.assessmentQuestions);

  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [roles, setRoles] = useState({});
  const learnerOutcomes = ["6748104066f4648c947d4c33"]; // Replace with actual data
  const questionTypes = ["MCQ", "Short Answer", "Essay"]; // Example types
  const difficultyLevels = ["Easy", "Medium", "Hard"]; // Example levels

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const questionData = Object.fromEntries(data.entries());

    // Include roles in the payload
    questionData.roles = roles;

    if (currentQuestion) {
      // Update existing question
      dispatch(
        updateQuestion({ id: currentQuestion._id, updatedData: questionData })
      );
    } else {
      // Create new question
      dispatch(createQuestion(questionData));
    }
    setShowForm(false);
  };

  const handleRoleChange = (role, permission) => {
    setRoles((prevRoles) => {
      const updatedRoles = { ...prevRoles };
      const existingPermissions = updatedRoles[role] || [];

      if (existingPermissions.includes(permission)) {
        // Remove permission if it already exists
        updatedRoles[role] = existingPermissions.filter(
          (p) => p !== permission
        );
        if (updatedRoles[role].length === 0) delete updatedRoles[role]; // Remove role if no permissions left
      } else {
        // Add permission
        updatedRoles[role] = [...existingPermissions, permission];
      }
      return updatedRoles;
    });
  };

  const openForm = (question = null) => {
    setCurrentQuestion(question);
    setRoles(question?.roles || {}); // Preload roles for editing
    setShowForm(true);
  };

  console.log(questions);
  return (
    <div>
      <Button onClick={() => openForm()}>Add New Question</Button>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.assessmentQuestion}</td>
              <td>
                <Button onClick={() => openForm(question)}>Edit</Button>
              </td>
              <td>
                <Button onClick={() => dispatch(deleteQuestion(question._id))}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Question Form */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentQuestion ? "Edit" : "Add"} Question</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {/* Question Field */}
            <Form.Group>
              <Form.Label>Assessment Question</Form.Label>
              <Form.Control
                type="text"
                name="assessmentQuestion"
                defaultValue={currentQuestion?.assessmentQuestion || ""}
                required
              />
            </Form.Group>

            {/* Academic Year */}
            <Form.Group>
              <Form.Label>Academic Year</Form.Label>
              <Form.Control
                type="text"
                name="academicYear"
                defaultValue={currentQuestion?.academicYear || ""}
                required
              />
            </Form.Group>

            {/* Learner Outcome */}
            <Form.Group>
              <Form.Label>Learner Outcome</Form.Label>
              <Form.Select
                name="learnerOutcomeId"
                defaultValue={currentQuestion?.learnerOutcomeId || ""}
              >
                <option value="">Select Learner Outcome</option>
                {learnerOutcomes.map((lo) => (
                  <option key={lo} value={lo}>
                    {lo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Question Type */}
            <Form.Group>
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                name="questionType"
                defaultValue={currentQuestion?.questionType || ""}
              >
                <option value="">Select Question Type</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Difficulty Level */}
            <Form.Group>
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Select
                name="difficultyLevel"
                defaultValue={currentQuestion?.difficultyLevel || ""}
              >
                <option value="">Select Difficulty Level</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Roles */}
            <Form.Group>
              <Form.Label>Roles</Form.Label>
              {["admin", "Teacher", "Student"].map((role) => (
                <div key={role}>
                  <Form.Label>{role}</Form.Label>
                  {["View", "Edit", "Create", "Delete"].map((permission) => (
                    <Form.Check
                      key={permission}
                      type="checkbox"
                      label={permission}
                      checked={roles[role]?.includes(permission) || false}
                      onChange={() => handleRoleChange(role, permission)}
                    />
                  ))}
                </div>
              ))}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AssessmentQuestions;
