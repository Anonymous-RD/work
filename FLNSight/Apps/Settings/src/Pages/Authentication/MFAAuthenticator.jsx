import React, { useState } from "react";

import loginright from "../../assets/login/login_right.png";
import flnlogo from "../../assets/login/flnlogo.png";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setVerifyOtp } from "../../redux/slices/authSlice";
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
  const email = user?.user?.email;

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Verify OTP entered by the user
      const response = await axios.post(
        "https://us-central1-firecmsdemo.cloudfunctions.net/auth/verify-mfa",
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
            // expires: 1 / 24,
            // domain: "." + rootDomain, // .apie.in
            // path: "/",
            // sameSite: "None",
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
        // setIsMfaVerified(true);
        dispatch(fetchUserDetails(response?.data?.token));
        toast.success("Successfully Verified!");

        // Navigate to the next page
        navigate("/admin/Dashboard");
      }
    } catch (error) {
      console.error("Invalid OTP or error occurred:", error);
      toast.error("Invalid MFA Code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col pr-10 pl-[60px] bg-white max-md:px-5 max-md:pb-24 mt-10">
      <div className="self-start w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full ml-36">
        <div className="flex gap-20 max-md:flex-col">
          {/* Left Section */}
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-8 max-md:mt-10">
              {/* Logo */}
              <div className="flex gap-3 items-center mb-10">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
              </div>
              {/* MFA Authenticator Text */}
              <div className="flex flex-col self-start">
                <h1 className="text-3xl font-bold text-gray-800">
                  MFA Authenticator
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Please enter the MFA Code
                </p>
              </div>
              {/* MFA Form */}
              <form
                onSubmit={verifyOtp}
                className="flex flex-col mt-6 w-full max-w-[404px]"
              >
                {/* MFA Code Input */}
                <div className="flex flex-col w-full">
                  <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
                    <label
                      htmlFor="mfa"
                      className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
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
                        "Verify"
                      )}
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

export default MFAAuthenticator;

// import React, { useState } from "react";

// import loginright from "../../assets/login/login_right.png";
// import flnlogo from "../../assets/login/flnlogo.png";

// import InputField from "../../components/InputField";
// import Button from "../../components/Button";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setVerifyOtp } from "../../redux/slices/authSlice";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
// import { fetchUserDetails } from "../../redux/slices/fetchUserDetailsSlice";
// const MFAAuthenticator = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let { user } = useSelector((state) => state.auth);
//   user = JSON.parse(user);
//   console.log(user?.user?.email);

//   const [otp, setOtp] = useState("");
//   const email = user?.user?.email;
//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       // Verify OTP entered by the user
//       const response = await axios.post(
//         "https://us-central1-firecmsdemo.cloudfunctions.net/auth/verify-mfa",
//         {
//           email,
//           token: otp,
//         }
//       );

//       if (response?.data?.success) {
//         dispatch(setVerifyOtp(true));
//         console.log("1-", response);
//         const mainDomain = new URL(window.location.href).hostname; // auth-fln.apie.in | localhost
//         const rootDomain = mainDomain.split(".").slice(-2).join("."); // apie.in | localhost
//         console.log("rootDomain: ", rootDomain);
//         if (rootDomain === "localhost") {
//           Cookies.set("token", response?.data?.token, {
//             // expires: 1 / 24,
//             // domain: "." + rootDomain, // .apie.in
//             // path: "/",
//             // sameSite: "None",
//           }); // 1 hour = 1/24 of a day
//         } else {
//           Cookies.set("token", response?.data?.token, {
//             expires: 1 / 24,
//             domain: "." + rootDomain,
//             path: "/",
//             secure: true,
//             sameSite: "None",
//           }); // 1 hour = 1/24 of a day
//         }
//         // setIsMfaVerified(true);
//         dispatch(fetchUserDetails(response?.data?.token));
//         // alert("MFA verified successfully!");
//         toast.success("Successfully Verified!");

//         // window.location.href = "https://survey-fln.web.app/admin/assessment"
//         // navigate("/admin/dashboard");
//         // navigate("http://localhost:5174/admin/assessment");
//         // window.location.href = "http://localhost:5174/admin/assessment";
//       }
//     } catch (error) {
//       console.error("Invalid OTP or error occurred:", error);
//       // alert("Invalid OTP or error occurred");
//       toast.error("Invalid OTP or error occurred");
//     }
//   };

//   return (
//     <div className="flex overflow-hidden flex-col pr-10 pl-[60px] bg-white max-md:px-5 max-md:pb-24 mt-10">
//       <div className="self-start w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full ml-36">
//         <div className="flex gap-20 max-md:flex-col">
//           {/* Left Section */}
//           <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
//             <div className="flex flex-col mt-8 max-md:mt-10">
//               {/* Logo */}
//               <div className="flex gap-3 items-center mb-10">
//                 <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
//                 <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
//               </div>
//               {/* MFA Authenticator Text */}
//               <div className="flex flex-col self-start">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                   MFA Authenticator
//                 </h1>
//                 <p className="mt-2 text-base text-gray-500">
//                   Please enter the MFA Code
//                 </p>
//               </div>
//               {/* MFA Form */}
//               <form
//                 onSubmit={verifyOtp} // Updated to use verifyOtp
//                 className="flex flex-col mt-6 w-full max-w-[404px]"
//               >
//                 {/* MFA Code Input */}
//                 <div className="flex flex-col w-full">
//                   <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
//                     <label
//                       htmlFor="mfa"
//                       className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
//                     >
//                       MFA Code
//                     </label>
//                     <input
//                       id="mfa"
//                       type="text"
//                       name="mfa"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)} // Updated to use setOtp
//                       placeholder="Enter the MFA code from your authenticator app"
//                       className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 focus:border-zinc-600 focus:outline-none max-md:pr-5"
//                       required
//                     />
//                   </div>
//                 </div>
//                 {/* Submit Button and Back Link */}
//                 <div className="flex flex-col items-center mt-6 max-w-full text-base font-semibold text-center text-gray-800 w-[404px]">
//                   <div className="flex flex-col w-full max-w-[404px]">
//                     <button
//                       type="submit"
//                       className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl hover:bg-orange-300"
//                     >
//                       Verify
//                     </button>
//                   </div>
//                   <br />
//                   <Link to="/" className="hover:underline">
//                     Back to Login
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//           {/* Right Section with Background Image */}
//           <div className="flex flex-col ml-5 w-[77%] h-[550px] max-md:ml-0 max-md:w-full max-md:hidden">
//             <div
//               className="h-full w-full bg-contain bg-no-repeat bg-center rounded-xl mt-1.5"
//               style={{ backgroundImage: `url(${loginright})` }}
//               aria-label="Background"
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MFAAuthenticator;
