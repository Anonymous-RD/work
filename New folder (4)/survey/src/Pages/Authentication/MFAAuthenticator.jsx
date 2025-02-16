import React, { useState } from "react";

import loginright from "../../assets/login/login-right.png";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setVerifyOtp } from "../../redux/slices/authSlice";
import Cookies from 'js-cookie';
import { fetchUserDetails } from "../../redux/slices/fetchUserDetailsSlice";
const MFAAuthenticator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  user = JSON.parse(user);
  console.log(user?.user?.email);

  const [otp, setOtp] = useState("");
  const email = user?.user?.email;
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP entered by the user
      const response = await axios.post("https://us-central1-firecmsdemo.cloudfunctions.net/auth/verify-mfa", {
        email,
        token: otp,
      });

      if (response?.data?.success) {
        dispatch(setVerifyOtp(true));
        console.log(response);
        Cookies.set('token', response?.data?.token, { expires: 1 / 24 }); // 1 hour = 1/24 of a day
        // setIsMfaVerified(true);
        dispatch(fetchUserDetails(response?.data?.token));
        alert("MFA verified successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Invalid OTP or error occurred:", error);
      alert("Invalid OTP or error occurred");
    }
  };

  return (
    <>
      <h1 className="text-[30px] font-semibold mx-4 sm:mx-16">IPEL Projects</h1>
      <div className="flex flex-col lg:flex-row">
        {/* Left Section (Form) */}
        <div className="mx-4 sm:mx-10 my-10 p-6 sm:p-10 lg:p-20 w-full sm:w-[40%]">
          <main className="flex flex-col max-w-[404px] mx-auto">
            <header className="flex flex-col self-start">
              <h1 className="text-3xl font-bold text-gray-800">
                MFA Authenticator
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Please enter the MFA Code
              </p>
            </header>
            <form className="flex flex-col mt-6 w-full">
              <div className="flex flex-col w-full min-h-[105px]">
                <label
                  htmlFor="email"
                  className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                >
                  MFA Code
                </label>
                <input
                  id="email"
                  type="text"
                  name="mfa"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the MFA code from your authenticator app"
                  className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                  required
                />
              </div>

              <div className="flex flex-col items-center mt-4 w-full font-semibold">
                <button
                  onClick={verifyOtp}
                  className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl  hover:bg-orange-300"
                >
                  Verify
                </button>
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
            alt=" Illustration"
            className="max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default MFAAuthenticator;
