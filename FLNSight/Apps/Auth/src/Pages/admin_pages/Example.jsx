import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Example() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    // Fetch classes on load
    axios
      .get(
        "https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/classes",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      )
      .then((res) => setClasses(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSubjects([]); // Clear subjects when class changes
    setChapters([]); // Clear chapters when class changes
    axios
      .get(
        `https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/subjects/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      )
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  };
  const handleSubjectChange = (subjectId) => {
    setSelectedSubject(subjectId);
    setChapters([]); // Clear chapters when subject changes
    axios
      .get(
        `https://us-central1-firecmsdemo.cloudfunctions.net/settingdetails/chapters/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      )
      .then((res) => setChapters(res.data))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Class, Subject, Chapter Selector</h1>
      <label>Class:</label>
      <select
        onChange={(e) => handleClassChange(e.target.value)}
        value={selectedClass || ""}
      >
        <option value="">Select a class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
      <label>Subject:</label>
      <select
        onChange={(e) => handleSubjectChange(e.target.value)}
        value={selectedSubject || ""}
        disabled={!selectedClass}
      >
        <option value="">Select a subject</option>
        {subjects.map((subj) => (
          <option key={subj._id} value={subj._id}>
            {subj.name}
          </option>
        ))}
      </select>
      <label>Chapter:</label>
      <select disabled={!selectedSubject}>
        <option value="">Select a chapter</option>
        {chapters.map((chap) => (
          <option key={chap._id} value={chap._id}>
            {chap.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Example;
