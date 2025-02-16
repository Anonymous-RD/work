import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginright from "../../assets/login/login_right.png";
import flnlogo from "../../assets/login/flnlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import Qr from "./Qr";
import toast from "react-hot-toast";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    qrCode,
    isMfaSetup,
    isMfaVerified,
    loading: authLoading,
    error,
    user,
  } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await dispatch(registerUser({ email, password })).unwrap();
      // Navigate based on the response from the registerUser action
      if (res.mfaSetup) {
        console.log("MFA setup needed");
        // toast.error("MFA setup needed");
      } else if (res.mfaRequired) {
        navigate("/verify-otp");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // alert("Error during registration");
      toast.error("Enter valid details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      {!isMfaSetup ? (
        
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="absolute mx-36 my-5">
          <div className="flex items-center mb-20">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8 mr-3" />
                <h1 className="text-xl text-gray-800 font-bold">FLNsight</h1>
              </div>
          </div>
              
          <div className="w-full lg:w-1/2 px-4 lg:px-12 xl:px-24 py-8 lg:py-12  flex items-center overflow-y-auto">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-8 ">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                  Welcome back
                </h2>
                <p className="text-base text-gray-500">
                  Welcome back! Please enter your details
                </p>
              </div>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-zinc-200"
                    } focus:border-zinc-600 focus:outline-none`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.password ? "border-red-500" : "border-zinc-200"
                    } focus:border-zinc-600 focus:outline-none`}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gray-800 hover:underline"
                  >
                    Forgot password
                  </Link>
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
                    "Sign in"
                  )}
                </button>
              </form>
            </div>
          </div>
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
      ) : (
        <Qr />
      )}
    </div>
  );
}

export default SignInPage;