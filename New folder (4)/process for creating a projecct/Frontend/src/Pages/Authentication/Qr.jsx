import React, { useState } from "react";
import loginright from "../../assets/login/login-right.png";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import axios from "axios"; // Import axios to make HTTP requests

const Login = () => {
  // Define state to hold form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <h1 className="text-[30px] font-semibold mx-4 sm:mx-16">IPEL Projects</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="mx-4 sm:mx-10 my-10 p-6 sm:p-10 lg:p-20 w-full sm:w-[40%]">
          <main className="flex flex-col max-w-[404px] mx-auto">
            <header className="flex flex-col self-start">
              <p className="mt-2 mb-3 text-base text-gray-500">
                Scan this QR code with your authenticator
              </p>
            </header>

            {/* <img
              src={loginright}
              alt="Login Illustration"
              className="max-w-30 h-auto object-cover my-100px "
            /> */}
            <div className="max-w-30 h-auto object-cover my-100px ">
              {" "}
              use qr code generated image{" "}
            </div>
            <div className="h-10 bg-[#C8EE44] mt-3 w-auto mx-auto text-center font-bold text-[12px] rounded-md p-1">
              <h1>123-334-566-788 </h1>
              {/* {"    use generated key"} */}
              <p className="text-sm text-[8px] ">setup key</p>
            </div>
          </main>
        </div>
        {/* Right Image Section (hidden on mobile, shown on lg and up) */}
        <div className="hidden lg:block w-[60%] my-10 lg:my-20 justify-center">
          <img
            src={loginright}
            alt="Login Illustration"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
