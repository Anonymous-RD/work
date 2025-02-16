import React from "react";
import { StudentRow } from "./StudentRow";

export function StudentList() {
  const studentData = [
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8c9df75782e335da0cd9c90ebd4d60016c28a9da49321323beb7dab42346f8cf?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: true,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ca889dcfafd88ca02ad6e05cb434af3961c59d6df8c8c3473aa7c839eb460541?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d52f617b3a32a1242440a9a52ec1923bb8a6c90babe2ef46fd082006067b09c5?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: true,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/414535a02504ebbdbed4352650a369708afbe3d336a34ab3bd3a636a4314e675?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/83749c33d821984f4ff1dc32329165ba5e29c85bcd99557a827f47cb4195abab?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: true,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/065825c8442e06c82a06edc3edf324e69d4a7170d1680c5c621d6c3bc292144b?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9a9f2d556bfec94be4657a061f927ebc78ca1434fa9c5003a79c83a9f7af318a?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: false,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6b1178cea9370964894966155e77a0d54cd56df61adaf92f757b7d47e0da70bd?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/40a9a83efcf6f1849213289c7c2d63828ee7bddf25ee5954b683643776446370?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: false,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a5abe8f084786ce2be21d2b50be74ee964c24e11da4ad83624681a553932da69?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/870b437b15d08e8823ae71f41ce5f480a46a52f8d88225a5f9510d3da596248b?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: false,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3d1e90c021120d658e9d874a42bc3f711c9006221a9a164737fc99f0b78714e7?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e12969976088cda7d9cabba70abb8dbbc4ac7abbb3ceb0eb3b601a39e424f985?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: false,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/db492d351f011800ef589bdbd97be8e4daffd5ed0b48d1710be51fca0f1f903f?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
    {
      className: "Class A",
      id: "001",
      avatarUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/97e95f2431bc772b43d567f075ef78af5b9a8fbf74aae063acd7bb7af153775c?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
      isActive: false,
      menuIconUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9bfd0fedf79c7989bc491b9230d20fc04b1e7abed6fa22a7e7194fc45f1e99ca?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac",
    },
  ];

  return (
    <div className="flex flex-col px-4">
      {studentData.map((student, index) => (
        <StudentRow
          key={index}
          className={student.className}
          id={student.id}
          avatarUrl={student.avatarUrl}
          isActive={student.isActive}
          menuIconUrl={student.menuIconUrl}
        />
      ))}
    </div>
  );
}
