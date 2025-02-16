import React from "react";
import SectionItem from "./SectionItem";

const sections = [
  {
    id: 1,
    sectionName: "Section A",
    className: "Class A",
    code: "1234",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/359c60d22b03688dc8ac67eadd2d19f71c8f8a97003c08c409370a2d6ded9bf5?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
  },
  {
    id: 2,
    sectionName: "Section A",
    className: "Class A",
    code: "1234",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/54f09dedc239a88b1462302bf0d9af62f5b0855ae8cb7e40438d2e2cdeb43e1c?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
  },
  {
    id: 3,
    sectionName: "Section A",
    className: "Class A",
    code: "1234",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0cccb8079ea4deaf0696d72d75dab3d58e37b399fdc2fa043de87bb9754e9955?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
  },
];

function SectionList() {
  return (
    <div className="flex flex-col">
      {sections.map((section) => (
        <SectionItem key={section.id} {...section} />
      ))}
    </div>
  );
}

export default SectionList;
