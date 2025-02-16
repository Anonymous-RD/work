import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const BlockItem = ({ name, number, action }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-2 px-4 text-sm font-semibold text-gray-600">{name}</td>
      <td className="py-2 px-4 text-sm font-semibold text-gray-600">{name}</td>
      <td className="py-2 px-4 text-sm font-medium text-gray-800">{number}</td>
      <td className="py-2 px-4 text-center text-gray-600">{action}</td>
    </tr>
  );
};

const blockData = [
  {
    name: "Block A",
    name2: "District A",
    number: "1234",
    action: (
      <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />
    ),
  },
  {
    name: "Block A",
    name2: "District A",
    number: "1234",
    action: (
      <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />
    ),
  },
  {
    name: "Block A",
    name2: "District A",
    number: "1234",
    action: (
      <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />
    ),
  },
  {
    name: "Block A",
    name2: "District A",
    number: "1234",
    action: (
      <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />
    ),
  },
  {
    name: "Block A",
    name2: "District A",
    number: "1234",
    action: (
      <BsThreeDotsVertical fontSize={24} fill="#000" className="mx-auto" />
    ),
  },
];

const BlockList = () => {
  return (
    <section className="mt-5 mx-auto w-full max-w-full overflow-x-auto">
      <table className="w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-xs font-semibold text-gray-500 uppercase text-left">
            <th className="py-3 px-4">Block Name</th>
            <th className="py-3 px-4">District Name</th>
            <th className="py-3 px-4">Block Code</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blockData.map((block, index1) => (
            <BlockItem
              key={index1}
              name={block.name}
              name1={block.name2}
              number={block.number}
              action={block.action}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BlockList;
