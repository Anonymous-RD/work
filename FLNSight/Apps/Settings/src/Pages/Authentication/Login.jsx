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
        toast.error("MFA setup needed");
      } else if (res.mfaRequired) {
        navigate("/verify-otp");
      } else {
        navigate("/admin/Dashboard");
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
    <div>
      {!isMfaSetup ? (
        <div className="flex overflow-hidden flex-col pr-10 pl-[30px] bg-white max-md:px-5 max-md:pb-24 mt-10">
          <div className="self-start w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full ml-36">
            <div className="flex gap-20 max-md:flex-col">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-8 max-md:mt-10">
                  <div className="flex gap-3 items-center mb-10">
                    <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                    <h1 className="text-2xl text-gray-800 font-bold">
                      FLNSight
                    </h1>
                  </div>
                  <div className="flex flex-col self-start">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome back
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                      Welcome back! Please enter your details
                    </p>
                  </div>
                  <form
                    className="flex flex-col mt-6 w-full max-w-[404px]"
                    onSubmit={handleRegister}
                  >
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
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                            errors.email ? "border-red-500" : "border-zinc-100"
                          } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-center mt-1.5 w-full">
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
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                            errors.password
                              ? "border-red-500"
                              : "border-zinc-100"
                          } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                          required
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-10 justify-between items-center mt-5 w-full text-sm font-medium text-gray-800">
                      <div className="flex gap-2.5 items-center self-stretch my-auto">
                        <input
                          type="checkbox"
                          name="rememberme"
                          id="rememberMe"
                          className="w-4 h-4 rounded border border-gray-400 border-solid"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="self-stretch my-auto"
                        >
                          Remember for 30 Days
                        </label>
                      </div>
                      <Link
                        type="button"
                        to="/forgot-password"
                        className="self-stretch my-auto text-right hover:underline"
                      >
                        Forgot password
                      </Link>
                    </div>
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
                            "Sign in"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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
      ) : (
        <Qr />
      )}
    </div>
  );
}

export default SignInPage;
