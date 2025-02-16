import * as React from "react";
import { IconButton } from "./iconButton";
import { UserProfile } from "./UserProfile";

const navigationIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/71fcbe6b7d6ab235c0bd8e4a82148dfbe5fe2fe03e649508f1bc58d0af6957ee?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d", alt: "Navigation item 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/271ac42c129898f321f665c647f56bdfe70792ec04b6be062f30bb60f8ef278c?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d", alt: "Navigation item 2" }
];

export function StudentHeader({ headerText = "Students" }) {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center">
      <div className="self-stretch my-auto text-2xl font-semibold text-gray-800">
        {headerText}
      </div>
      <div className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
        <div className="flex gap-10 items-start self-stretch my-auto">
          {navigationIcons.map((icon, index) => (
            <IconButton 
              key={index}
              src={icon.src}
              alt={icon.alt}
            />
          ))}
        </div>
        <UserProfile
          avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0f36fbcd8af7a3b57e510bbacc8d927c26831226db2eb2a195bda96eef098000?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
          name="Ankit Mishra"
          dropdownIconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/abae8afd1b2335177ce735b6bb078dddbdf2a9245219b45e5eb12fea3e163c3a?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
        />
      </div>
    </div>
  );
}