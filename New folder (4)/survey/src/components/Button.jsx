import React, { Children } from "react";

const Button = (props) => {
  return (
    <button className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-[#C8EE44] hover:bg-orange-300 rounded-xl text-base font-semibold text-center text-gray-800">
      {props.data}
    </button>
  );
};

export default Button;
