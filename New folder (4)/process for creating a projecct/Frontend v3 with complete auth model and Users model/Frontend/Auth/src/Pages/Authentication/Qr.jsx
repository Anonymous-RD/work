import React, { useState } from "react";
import loginright from "../../assets/login/login_right.png";
import flnlogo from "../../assets/login/flnlogo.png";

import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import axios from "axios"; // Import axios to make HTTP requests
import { useSelector } from "react-redux";

const Qr = () => {
  // Define state to hold form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { qrCode, isMfaSetup, isMfaVerified, loading, error } = useSelector(
    (state) => state.auth
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // // Create an object with the email and password
    const userCredentials = { email, password };

    // console.log("Entered User Credentials:", userCredentials);

    try {
      const response = await axios.post("/api/login", userCredentials);

      if (response.status === 200) {
        alert("Login successful");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex overflow-hidden flex-col pr-10 pl-[60px] mx-14 bg-white max-md:px-5 max-md:pb-24 mt-[30px]">
        <div className="self-end w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-15 max-md:flex-col">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 px-6 sm:px-12 py-10 bg-white">
              <div className="flex gap-3 items-start mb-10">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
              </div>
              <div className="flex flex-col justify-center items-center mt-8 mr-14">
                <div className="max-w-sm w-full text-center">
                  <p className="text-gray-500 font-normal text-lg mb-6">
                    Scan this QR code with your authenticator app:
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="max-w-[150px] sm:max-w-[200px] h-auto mb-6"
                    />
                  </div>
                  <div className=" bg-[#C8EE44] w-[237px] h-[51px] rounded-lg text-center inline-block">
                    <button className="font-medium text-base w-[203px] h-[34px] text-gray-800">
                      123-334-566-788
                    </button>
                    <div className="text-xs font-medium">setup key</div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
                      <div className="flex flex-col w-full max-w-[404px]">
                        <Link to="/verify-otp">
                          <button
                            type="submit"
                            className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl  hover:bg-orange-300"
                          >
                            Proceed
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full  lg:w-1/2 flex justify-center items-center">
              <img
                src={loginright}
                alt="Background Illustration"
                className="max-w-[70%] max-h-[93%] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Qr;
