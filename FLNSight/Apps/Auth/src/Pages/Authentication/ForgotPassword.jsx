import React, { useState } from "react";
import loginright from "../../assets/login/login_right.png";
import flnlogo from "../../assets/login/flnlogo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
// import axios from "axios";
// import { setVerify } from "../../redux/slices/authSlice";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
// import { fetchUserDetails } from "../../redux/slices/fetchUserDetailsSlice";

const Forgassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false); // Add loading state

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      await sendPasswordResetEmail(auth, email);

      Swal.fire({
        icon: "success",
        iconColor: "#C8EE44",
        // width: "42rem",
        title: "Password reset link sent successfully",
        text: `We have sent a password reset link to the entered email id. Please go to inbox and click on the link to set a new password for your account.`,
        textColor: "black",
        confirmButtonColor: "#C8EE44",
        confirmButtonText: "<span style='color: black'>Back To Login</span>",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/"); // Redirect to login page after success
        }
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          textColor: "black",
          text: `The email address ${email} does not correspond to any user.`,
          confirmButtonColor: "#C8EE44",
          confirmButtonText: "<span style='color: black'>Okay</span>",
        });
      } else {
        const cleanErrorMessage = error.message
          .replace(/firebase\s*/gi, "")
          .replace(/\s+/g, " ")
          .trim();
        Swal.fire({
          icon: "error",
          title: "OOPS....",
          text: cleanErrorMessage,
          confirmButtonColor: "#C8EE44",
        });
      }
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* // FLNsight logo */}
        {/* form */}

        <div className="w-full lg:w-1/2 px-4 lg:px-12 xl:px-24 py-8 lg:py-12  flex items-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto mb-auto">
            <div className=" flex pb-16 ">
              <div className="flex items-center mb-20">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8 mr-3" />
                <h1 className="text-xl text-gray-800 font-bold">FLNsight</h1>
              </div>
            </div>
            <div className="mb-8 ">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Forgot Password
              </h2>
              <p className="text-base text-gray-500">
                We will send a password reset link{" "}
              </p>
            </div>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label
                  htmlFor="mfa"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  id="mfa"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-500" : "border-zinc-200"
                  } focus:border-zinc-600 focus:outline-none`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-lime-300 rounded-xl font-semibold text-gray-800 hover:bg-orange-300 transition duration-300"
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
                  "Send Link"
                )}
              </button>
              <br />
              <br />
              <Link
                to={"/"}
                className="hover:underline ml-[40%] text-sm font-semibold"
              >
                Back to Login
              </Link>
            </form>
          </div>
        </div>
        {/* Right Section with Background Image */}

        <div className="w-full lg:w-1/2 h-64 lg:h-screen">
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
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
export default Forgassword;
