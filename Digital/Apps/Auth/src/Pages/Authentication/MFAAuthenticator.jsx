import React, { useState } from "react";
import loginright from "../../assets/login/login-right.png";
import flnlogo from "../../assets/login/flnlogo.png";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetAuthState, setVerifyOtp } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { fetchUserDetails } from "../../redux/slices/fetchUserDetailsSlice";

const MFAAuthenticator = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  user = JSON.parse(user);
  console.log(user?.user?.email);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const email = user?.user?.email;

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Verify OTP entered by the user
      const response = await axios.post(
        "https://us-central1-styletrends-5dc20.cloudfunctions.net/auth/verify-mfa",
        {
          email,
          token: otp,
        }
      );

      if (response?.data?.success) {
        dispatch(setVerifyOtp(true));
        console.log("1-", response);
        const mainDomain = new URL(window.location.href).hostname; // auth-fln.apie.in | localhost
        const rootDomain = mainDomain.split(".").slice(-2).join("."); // apie.in | localhost
        console.log("rootDomain: ", rootDomain);
        if (rootDomain === "localhost") {
          Cookies.set("token", response?.data?.token, {
            expires: 1 / 24,
          }); // 1 hour = 1/24 of a day
        } else {
          Cookies.set("token", response?.data?.token, {
            expires: 1 / 24,
            domain: "." + rootDomain,
            path: "/",
            secure: true,
            sameSite: "None",
          }); // 1 hour = 1/24 of a day
        }
        dispatch(fetchUserDetails(response?.data?.token));
        toast.success("Successfully Verified!");

        // Navigate to the next page
        navigate("/");
    // (window.location.href = import.meta.env.VITE_USERS_URL)


      }
    } catch (error) {
      console.error("Invalid OTP or error occurred:", error);
      toast.error("Invalid MFA Code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 px-4 lg:px-12 xl:px-24 py-8 lg:py-12 flex items-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto mb-auto">
            <div className="flex pb-16">
              <div className="flex items-center mb-20">
                {/* <img src={flnlogo} alt="FLN Logo" className="h-8 w-8 mr-3" /> */}
                <h1 className="text-xl text-gray-800 font-bold">IPEL Projects</h1>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                MFA Authenticator
              </h2>
              <p className="text-base text-gray-500">
                Please enter the MFA Code
              </p>
            </div>
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="mfa"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  MFA Code
                </label>
                <input
                  id="mfa"
                  type="text"
                  name="mfa"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the MFA code from your authenticator app"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.mfa ? "border-red-500" : "border-zinc-200"
                  } focus:border-zinc-600 focus:outline-none`}
                  required
                />
                {errors.mfa && (
                  <p className="text-red-500 text-sm mt-1">{errors.mfa}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-midnightblue-950 rounded-xl font-semibold text-white hover:bg-midnightblue-600 transition duration-300"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto"
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
                  "Verify"
                )}
              </button>
              <br />
              <br />
              <Link
                to={"/"}
                onClick={() => dispatch(resetAuthState())}
                className="hover:underline ml-[40%] text-sm font-semibold"
              >
                Back to Login
              </Link>
            </form>
          </div>
        </div>

        {/* Right Section with Background Image - Hidden on Smaller Screens */}
        <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen">
          <div className="mt-[20%] mr-[10%] bg-contain w-full flex items-center justify-center bg-gray-100">
            <img
              src={loginright}
              alt="Login background"
              className="object-fit object-center w-full h-full pr-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MFAAuthenticator;
