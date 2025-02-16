import React, { useState } from "react";

import loginright from "../../assets/login/login-right.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  let [formData, setFormData] = useState({
    email: "",
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
    navigate("/MFA");
    // if (email === " ") {
    //   Swal.fire({
    //     icon: "error",
    //     title: "OOPS....",
    //     text: "Enter a email address",
    //     confirmButtonColor: "#C8EE44",
    //   });
    //   return;
    // }

    // Swal.fire({
    //   icon: "success",
    //   iconColor: "#C8EE44",
    //   //   width: "42rem",
    //   title: "Success!",
    //   text: "Password reset link sent successfully",
    //   textColor: "black",
    //   confirmButtonColor: "#C8EE44",
    //   confirmButtonText: "Back To Login",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navigate("/"); // Redirect to login page after success
    //   }
    // });
  }

  return (
    <>
      <h1 className="text-[30px] font-semibold mx-4 sm:mx-16">IPEL Projects</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Left Section (Form) */}
        <div className="mx-4 sm:mx-10 my-10 p-6 sm:p-10 lg:p-20 w-full sm:w-[40%]">
          <main className="flex flex-col max-w-[404px] mx-auto">
            <header className="flex flex-col self-start">
              <h1 className="text-3xl font-bold text-gray-800">
                Forgot Password
              </h1>
              <p className="mt-2 text-base text-gray-500">
                We will send a password reset link
              </p>
            </header>
            <form
              onSubmit={submitHandler}
              className="flex flex-col mt-6 w-full"
            >
              <div className="flex flex-col w-full min-h-[105px]">
                <label
                  htmlFor="password"
                  className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  //   value={email}
                  onChange={onHandler}
                  placeholder="Enter your email"
                  className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                  required
                />
              </div>

              <div className="flex flex-col items-center mt-4 w-full font-semibold">
                <button
                  type="submit"
                  className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl  hover:bg-orange-300"
                >
                  Send Link
                </button>
                {/* <Button type="submit" data={"Send Link"}></Button> */}
                <br />
                <Link to="/" className="hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          </main>
        </div>

        {/* Right Image Section (Hidden on Mobile, shown on larger screens) */}
        <div className="hidden lg:block w-full sm:w-[60%] my-10 lg:my-20  justify-center">
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

export default ForgotPassword;
