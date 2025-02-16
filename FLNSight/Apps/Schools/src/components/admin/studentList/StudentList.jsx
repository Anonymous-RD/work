import * as React from "react";
import StudentListItem from "./StudentListitem";

const StudentList = () => {
  const students = [
    {
      studentImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/b1cc760bdbf64453e827b8df8a1bd4b767b1910529da758dcf1f226a47d9e6ef?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d",
      studentName: "Glen Stark",
      studentId: "MGL0124877",
      className: "Class 3(A)",
      year: "2005",
      parentName: "James Stark",
      
    }
  ];

  return (
    <div>
      {students.map((student, index) => (
        <StudentListItem
          key={student.studentId}
          studentImage={student.studentImage}
          studentName={student.studentName}
          studentId={student.studentId}
          className={student.className}
          year={student.year}
          parentName={student.parentName}
         
        />
      ))}
    </div>
  );
};

export default StudentList;







