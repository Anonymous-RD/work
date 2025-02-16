import React, { useState } from "react";

import loginright from "../../assets/login/login-right.png";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Swal from "sweetalert2";

const Invitation = () => {
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });
  console.log(formData);
  function onHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    // navigate("/invitation");

    // if (email === " ") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "OOPS....",
    //     text: "Enter a email address",
    //     confirmButtonColor: "#C8EE44",
    //   });
    //   return;
    // }

    Swal.fire({
      icon: "success",
      iconColor: "#C8EE44",
      //   width: "42rem",
      title: "Success!",
      text: "Password reset link sent successfully",
      textColor: "black",
      confirmButtonColor: "#C8EE44",
      confirmButtonText: "Back To Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Redirect to login page after success
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1 className="text-[30px] font-semibold mx-4 sm:mx-16">IPEL Projects</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="mx-4 sm:mx-10 my-10 p-6 sm:p-10 lg:p-20 w-full sm:w-[40%]">
          <main className="flex flex-col max-w-[404px] mx-auto">
            <header className="flex flex-col self-start">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Password
              </h1>
              <p className="mt-2 text-base text-gray-500">
                {`Create a password for xyz@email.com`}
              </p>
            </header>
            <form
              onSubmit={submitHandler}
              className="flex flex-col mt-6 w-full"
            >
              <div className="flex flex-col w-full min-h-[175px]">
                <label
                  htmlFor="password"
                  className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  //   value={password}
                  onChange={onHandler}
                  placeholder="Enter your password"
                  className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                  required
                />
                <label
                  htmlFor="password"
                  className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  Confirm Password
                </label>
                <input
                  id="c-password"
                  type="password"
                  name="confirm"
                  //   value={password}
                  onChange={onHandler}
                  placeholder="Enter your password"
                  className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                  required
                />
              </div>

              <div className="flex flex-col items-center mt-6 w-full">
                <Button type="submit" data={"Create Password"}></Button>
              </div>
            </form>
          </main>
        </div>
        {/* Right Image Section (hidden on mobile, shown on lg and up) */}
        <div className="hidden lg:block w-[60%] my-10 lg:my-20  justify-center">
          <img
            src={loginright}
            alt="Invitation Illustration"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Invitation;
