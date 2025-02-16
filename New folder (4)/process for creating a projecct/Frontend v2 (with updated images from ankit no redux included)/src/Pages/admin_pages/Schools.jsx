import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const AssessmentItem = ({ slNo, schoolName, blockAndDistrict, udiseCode, action }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-2 px-4 text-sm font-semibold text-gray-600">{slNo}</td>
      <td className="py-2 px-4 text-sm font-medium text-gray-800">{schoolName}</td>
      <td className="py-2 px-4 text-sm font-medium text-gray-600">{blockAndDistrict}</td>
      <td className="py-2 px-4 text-sm font-medium text-gray-600">{udiseCode}</td>
      <td className="py-2 px-4 text-center text-gray-600">{action}</td>
    </tr>
  );
};

const Schools = () => {
  const assessments = [
    {
      slNo: "1",
      schoolName: "School A",
      blockAndDistrict: "BlockA, DistrictA",
      udiseCode: "1234",
      action: <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />,
    },
    {
      slNo: "1",
      schoolName: "School A",
      blockAndDistrict: "BlockA, DistrictA",
      udiseCode: "1234",
      action: <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />,
    },
    {
      slNo: "1",
      schoolName: "School A",
      blockAndDistrict: "BlockA, DistrictA",
      udiseCode: "1234",
      action: <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />,
    },
    {
      slNo: "1",
      schoolName: "School A",
      blockAndDistrict: "BlockA, DistrictA",
      udiseCode: "1234",
      action: <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />,
    },
    {
      slNo: "1",
      schoolName: "School A",
      blockAndDistrict: "BlockA, DistrictA",
      udiseCode: "1234",
      action: <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />,
    },
    // Add more items here
  ];

  return (
    <section className="mt-5 mx-auto w-full max-w-full overflow-x-auto">
      <table className="w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-xs font-semibold text-gray-500 uppercase text-left">
            <th className="py-3 px-4">SL No.</th>
            <th className="py-3 px-4">School Name</th>
            <th className="py-3 px-4">Block and District</th>
            <th className="py-3 px-4">UDISE Code</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment, index) => (
            <AssessmentItem
              key={`assessment-${index}`}
              slNo={assessment.slNo}
              schoolName={assessment.schoolName}
              blockAndDistrict={assessment.blockAndDistrict}
              udiseCode={assessment.udiseCode}
              action={assessment.action}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Schools;
