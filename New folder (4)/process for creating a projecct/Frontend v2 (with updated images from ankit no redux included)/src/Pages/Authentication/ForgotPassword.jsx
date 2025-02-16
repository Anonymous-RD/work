import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginright from "../../assets/login/login_right.png";
import flnlogo from "../../assets/login/flnlogo.png";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const onHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    navigate("/MFA");
  };

  return (
    <div className="flex overflow-hidden flex-col pr-10 pl-[60px] bg-white max-md:px-5 max-md:pb-24 mt-10">
      <div className="self-end w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-20 max-md:flex-col">
          {/* Left Section */}
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-8 max-md:mt-10">
              {/* Logo */}
              <div className="flex gap-3 items-center mb-10">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
              </div>
              {/* Forgot Password Text */}
              <div className="flex flex-col self-start">
                <h1 className="text-3xl font-bold text-gray-800">
                  Forgot Password
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  We will send a password reset link
                </p>
              </div>
              {/* Forgot Password Form */}
              <form
                onSubmit={submitHandler}
                className="flex flex-col mt-6 w-full max-w-[404px]"
              >
                {/* Email Input */}
                <div className="flex flex-col w-full">
                  <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
                    <label
                      htmlFor="email"
                      className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={onHandler}
                      placeholder="Enter your email"
                      className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 focus:border-zinc-600 focus:outline-none max-md:pr-5"
                      required
                    />
                  </div>
                </div>
                {/* Submit Button and Back Link */}
                <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
                  <div className="flex flex-col w-full max-w-[404px]">
                    <button
                      type="submit"
                      className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl hover:bg-orange-300"
                    >
                      Send Link
                    </button>
                  </div>
                  <br />
                  <Link to="/" className="hover:underline">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* Right Section with Background Image */}
          <div className="flex flex-col ml-5 w-[77%] h-[550px] max-md:ml-0 max-md:w-full max-md:hidden">
            <div
              className="h-full w-full bg-contain bg-no-repeat bg-center rounded-xl mt-1.5"
              style={{ backgroundImage: `url(${loginright})` }}
              aria-label="Background"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
