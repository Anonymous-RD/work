// import * as React from "react";
// import { FileListItem } from "./FilelistItem";


// const fileData = [
//   {
//     type: "Document",
//     fileName: "file_name.xlsx",
//     date: "14 Apr 2015",
//     author: "John Doe",
//     description: "Lorem Ipsum",
//     iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd9ae887b8e6827fff5e82be3ea5056d27ae2d3fd3f299e2b7aaf5a97da91878?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
//   },
//   {
//     type: "Audio",
//     fileName: "file_name.mp3",
//     date: "14 Apr 2015",
//     author: "John Doe",
//     description: "Lorem Ipsum",
//     iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/88579f79889015e6503c6a9691e226aa6904af9f14f3f30210615744751e121a?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
//   },
//   {
//     type: "Video",
//     fileName: "file_name.mp4",
//     date: "14 Apr 2015",
//     author: "John Doe",
//     description: "Lorem Ipsum",
//     iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6be733f9d8bd5aaa6102ba387bf6489357fa946253b35a367924d0e930e17e39?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
//   },
//   {
//     type: "Document",
//     fileName: "file_name.pdf",
//     date: "14 Apr 2015",
//     author: "John Doe",
//     description: "Lorem Ipsum",
//     iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ecd06fc3a85cd637e9a80c18f8e62ec8a2b8bf85fec8d346bca4612d3baff2ca?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
//   }
// ];

// export function FileList() {
//   return (
//     <div className="flex flex-col">
//       {fileData.map((file, index) => (
//         <div key={index} className="mt-5 first:mt-0">
//           <FileListItem {...file} />
//         </div>
//       ))}
//     </div>
//   );
// }
import React from "react";
import { FileListItem } from "./FileListItem";

const fileData = [
  {
    type: "Document",
    fileName: "file_name.xlsx",
    date: "14 Apr 2015",
    author: "John Doe",
    description: "Lorem Ipsum",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd9ae887b8e6827fff5e82be3ea5056d27ae2d3fd3f299e2b7aaf5a97da91878",
  },
  {
    type: "Audio",
    fileName: "file_name.mp3",
    date: "14 Apr 2015",
    author: "John Doe",
    description: "Lorem Ipsum",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/88579f79889015e6503c6a9691e226aa6904af9f14f3f30210615744751e121a",
  },
  {
    type: "Video",
    fileName: "file_name.mp4",
    date: "14 Apr 2015",
    author: "John Doe",
    description: "Lorem Ipsum",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6be733f9d8bd5aaa6102ba387bf6489357fa946253b35a367924d0e930e17e39",
  },
  {
    type: "Document",
    fileName: "file_name.pdf",
    date: "14 Apr 2015",
    author: "John Doe",
    description: "Lorem Ipsum",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ecd06fc3a85cd637e9a80c18f8e62ec8a2b8bf85fec8d346bca4612d3baff2ca",
  },
];

export function FileList() {
  return (
    <div>
      {fileData.map((file, index) => (
        <FileListItem key={index} {...file} />
      ))}
    </div>
  );
}
