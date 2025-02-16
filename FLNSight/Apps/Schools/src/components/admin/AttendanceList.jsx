import React from "react";
import AttendanceRow from "./AttendanceRow";

export default function AttendanceList() {
  const attendanceData = [
    {
      date: "1 JAN 2023",
      day: "Thursday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ca889dcfafd88ca02ad6e05cb434af3961c59d6df8c8c3473aa7c839eb460541?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "2 JAN 2023",
      day: "Friday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e7a56c4f6f303c590b5cb1d58e0e3efe554f9b0231d405908a8358e4212f1dd3?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "2 JAN 2023",
      day: "Saturday",
      status: "Absent",
      statusColor: "text-red-600",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0cccb8079ea4deaf0696d72d75dab3d58e37b399fdc2fa043de87bb9754e9955?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "4 JAN 2023",
      day: "Sunday",
      status: "-",
      statusColor: "text-gray-400",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ab1bdb0a69b8af6c327906f58912bc1b2292338ab5ba5ad51d5422899fb10d4?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "5 JAN 2023",
      day: "Monday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a32aaf0a8f0bca5ea006e191bdef656ecbe81680a4d0d0b0ded8e4855cddf1cd?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "6 JAN 2023",
      day: "Tuesday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f4802fb27e803e7e7d7502748798f944a5d44f1fe556bda910974b71c556a7f1?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "7 JAN 2023",
      day: "Wednesday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3f968c5aac90b35bee485aeb219573f9b75abdda0147ef62bd8e0b815f957cbd?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
    {
      date: "8 JAN 2023",
      day: "Thursday",
      status: "Present",
      statusColor: "text-green-500",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0c2773720c67115f6b962afc68e80a82383c5e18854653249427e5698000f385?placeholderIfAbsent=true&apiKey=52641bd4f37243d1b72f1a5ce4ca9211",
    },
  ];

  return (
    <div className="flex flex-col">
      {attendanceData.map((item, index) => (
        <div key={index} className={index > 0 ? "mt-2" : ""}>
          <AttendanceRow
            date={item.date}
            day={item.day}
            status={item.status}
            statusColor={item.statusColor}
            imageUrl={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}
