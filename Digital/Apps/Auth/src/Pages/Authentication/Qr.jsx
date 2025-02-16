import React, { useState } from "react";
import loginright from "../../assets/login/login-right.png";
import flnlogo from "../../assets/login/flnlogo.png";

import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import axios from "axios"; // Import axios to make HTTP requests
import { useSelector } from "react-redux";
import { FiCopy, FiCheck } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

const Qr = () => {
  // Define state to hold form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [errors, setErrors] = useState({});

  const { qrCode, setup_key, isMfaSetup, isMfaVerified, loading, error } =
    useSelector((state) => state.auth);

  const copyToClipboard = async () => {
    try {
      const formattedKey = setup_key.match(/.{1,4}/g).join("-");
      await navigator.clipboard.writeText(formattedKey);
      setCopySuccess("Copied");
      toast.success("Copied to clipboard");
    } catch (err) {
      // setCopySuccess("Failed to copy!");
      toast.error("Failed to copy to clipboard");
    }
  };
  const formattedKey = setup_key ? setup_key.match(/.{1,4}/g).join("-") : "";

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   // // Create an object with the email and password
  //   const userCredentials = { email, password };

  //   // console.log("Entered User Credentials:", userCredentials);

  //   // try {
  //   //   const response = await axios.post("/api/login", userCredentials);

  //   //   if (response.status === 200) {
  //   //     alert("Login successful");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error logging in", error);
  //   //   alert("An error occurred. Please try again.");
  //   // }
  // };
  const navigate = useNavigate();
  function hand() {
    navigate("/verify-otp");
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Section (Form) */}
        <div className="w-full lg:w-1/2 px-4 lg:px-12 xl:px-24 py-8 lg:py-12 flex items-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto mb-auto">
            <div className="flex pb-16">
              <div className="flex items-center mb-20">
                {/* <img src={flnlogo} alt="FLN Logo" className="h-8 w-8 mr-3" /> */}
                <h1 className="text-xl text-gray-800 font-bold">IPEL Projects</h1>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-base text-gray-500 pl-7 mb-2">
                Scan this QR code with your authenticator app:
              </p>
              <p className="text-[10px] text-[#6d7a8d]">
                You can download Google Authenticator or Microsoft Authenticator
                from PlayStore or AppStore
              </p>
            </div>
            <form className="flex flex-col mt-6 w-full max-w-[404px]">
              {/* MFA Code Input */}
              <div className="flex flex-col w-full pl-[60px] ">
                <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium ml-16 ">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="max-w-[150px] sm:max-w-[150px] h-[150px] mb-3 border-[#DAE8F0] border-4 rounded-[10px]"
                  />
                </div>
                <div className="flex flex-col w-full max-w-[404px] mb-5">
                  <span className="text-gray-400 flex flex-col w-full max-w-[404px] ml-[37%]">
                    OR
                  </span>
                  <h1 className="text-base text-gray-500 mb-2">
                    Enter Setup Key in your authenticator app
                  </h1>
                </div>
                <span className="text-xs font-semibold absolute mt-[228px] ml-6 ">
                  Setup Key
                </span>
                <div className="flex bg-[#DBDBDB] rounded-xl text-center p-2 mr-16 ">
                  <div className="flex-grow font-medium mr-6 text-base border-[#494a4a] border-r-2">
                    {formattedKey}
                  </div>
                  <p onClick={copyToClipboard} className="cursor-pointer">
                    {copySuccess ? (
                      <FiCheck size={24} />
                    ) : (
                      <MdOutlineContentCopy size={24} />
                    )}
                  </p>
                </div>
              </div>
              {/* Submit Button and Back Link */}
              <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
                <div className="flex flex-col w-full max-w-[404px]">
                  <button
                    type="submit"
                    className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-midnightblue-950 rounded-xl text-white  hover:bg-midnightblue-600 "
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.292A8.962 8.962 0 014 12H2c0 2.487.832 4.78 2.219 6.573l1.543-1.281z"
                        ></path>
                      </svg>
                    ) : (
                      <h1 onClick={hand}>
                        I have done the Setup, Proceed to MFA
                      </h1>
                    )}
                  </button>
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
        {/* Right Section with Background Image */}
        <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen">
          <div className="mt-[20%] mr-[10%] bg-contain w-full flex items-center justify-center bg-gray-100 px-[20px]">
            <img
              src={loginright}
              alt="Login background"
              className="object-fit object-center w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qr;
