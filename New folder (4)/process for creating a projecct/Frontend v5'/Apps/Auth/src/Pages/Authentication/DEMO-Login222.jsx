import { auth } from "@/firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import flnlogo from "../../assets/login/flnlogo.png";
import loginright from "../../assets/login/login_right.png";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (!code) {
      setMessage("Invalid or missing reset code.");
      setIsLoading(false);
      return;
    }
    setOobCode(code);

    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setEmail(email);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage("Invalid or expired reset code.");
        setIsLoading(false);
      });
  }, [searchParams]);

  const validate = () => {
    let errors = {};
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, oobCode, password);

      Swal.fire({
        icon: "success",
        iconColor: "#C8EE44",
        title: "Account created successfully",
        text: `Your account has been successfully created. You can start logging into your account now.`,
        textColor: "black",
        confirmButtonColor: "#C8EE44",
        confirmButtonText: "Back To Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/"); // Redirect to the home page after successful reset
        }
      });

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="relative h-screen">
        {/* Overlay for the loading spinner */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <svg
            className="animate-spin h-10 w-10 text-lime-300"
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
        </div>
        {/* Page content with spinner overlay */}
        <div className="flex overflow-hidden flex-col pr-10 pl-[30px] bg-white max-md:px-5 max-md:pb-24 opacity-50 pointer-events-none">
          <div className="self-start w-full  max-md:mt-10  ml-14">
            <div className="flex gap-20 max-md:flex-col">
              <div className="left flex flex-col w-1/2">
                <div className="flex flex-col mt-18 max-md:mt-10 ml-10">
                  <div className="flex gap-3 items-center mb-10  mt-10 ">
                    <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                    <h1 className="text-2xl text-gray-800 font-bold">
                      FLNSight
                    </h1>
                  </div>
                  <div className="flex flex-col self-start mt-20">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Create Password
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                      Create a password for {email}
                    </p>
                  </div>
                  <form
                    className="flex flex-col mt-6 w-full max-w-[404px]"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
                        <label
                          htmlFor="password"
                          className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          value={password}
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
                      <div className="flex flex-col justify-center mt-1.5 w-full">
                        <label
                          htmlFor="confirmPassword"
                          className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                            errors.confirmPassword
                              ? "border-red-500"
                              : "border-zinc-100"
                          } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                          required
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
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
                            "Reset Password"
                          )}
                        </button>
                      </div>
                    </div>
                    {message && (
                      <p className="mt-4 text-center text-red-500">{message}</p>
                    )}
                  </form>
                </div>
              </div>
              <div className="right flex flex-col w-1/2 h-screen max-md:w-full max-md:hidden">
                <div
                  className="h-full w-full bg-cover bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${loginright})` }}
                  aria-label="Background"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden flex-col pr-10 pl-[30px] bg-white max-md:px-5 max-md:pb-24">
      <div className="self-start w-full  max-md:mt-10  ml-14">
        <div className="flex gap-20 max-md:flex-col">
          <div className="left flex flex-col w-1/2">
            <div className="flex flex-col mt-18 max-md:mt-10 ml-10">
              <div className="flex gap-3 items-center mb-10  mt-10 ">
                <img src={flnlogo} alt="FLN Logo" className="h-8 w-8" />
                <h1 className="text-2xl text-gray-800 font-bold">FLNSight</h1>
              </div>
              <div className="flex flex-col self-start mt-20">
                <h1 className="text-3xl font-bold text-gray-800">
                  Create Password
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Create a password for {email}
                </p>
              </div>
              <form
                className="flex flex-col mt-6 w-full max-w-[404px]"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col w-full">
                  <div className="flex flex-col flex-1 justify-center w-full text-sm font-medium">
                    <label
                      htmlFor="password"
                      className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                        errors.password ? "border-red-500" : "border-zinc-100"
                      } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center mt-1.5 w-full">
                    <label
                      htmlFor="confirmPassword"
                      className="gap-2.5 py-2.5 pr-2.5 w-full text-sm font-medium text-gray-800 whitespace-nowrap"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-zinc-100"
                      } focus:border-zinc-600 focus:outline-none max-md:pr-5`}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
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
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </div>
                {message && (
                  <p className="mt-4 text-center text-red-500">{message}</p>
                )}
              </form>
            </div>
          </div>
          <div className="right flex flex-col w-1/2 max-md:h-full h-screen max-md:w-full max-md:hidden">
            {" "}
            <div
              className="h-full w-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${loginright})` }}
              aria-label="Background"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
