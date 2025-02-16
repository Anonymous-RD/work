import { auth } from "@/firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import flnlogo from "../../assets/login/flnlogo.png";
import loginright from "../../assets/login/login-right.png";
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

  const [mode, setMode] = useState("create");

  useEffect(() => {
    const code = searchParams.get("oobCode");
    const urlMode = searchParams.get("mode");

    if (urlMode === "resetPassword") {
      setMode("reset");
    }

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
        iconColor: "#003765",
        title: `Password ${
          mode === "reset" ? "reset" : "created"
        } successfully`,
        text: `You can start logging into your account now.`,
        textColor: "black",
        showConfirmButton: false,
        timer: 3500,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      setMessage(
        `Password ${
          mode === "reset" ? "reset" : "creation"
        } successful! Redirecting to login...`
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMessage(
        `Failed to ${
          mode === "reset" ? "reset" : "create"
        } password. Please try again.`
      );
    } finally {
      setIsLoading(false);
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
                {mode === "reset" ? "Reset Password" : "Create Password"}
              </h2>
              <p className="text-base text-gray-500">
                {mode === "reset"
                  ? "Reset a password for "
                  : "Create a password for "}
                {email}
              </p>
            </div>
            <form
              className="flex flex-col mt-6 w-full max-w-[404px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid ${
                      errors.confirmPassword
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
                    className="gap-2.5 self-stretch px-5 py-3.5 w-full text-white bg-midnightblue-950 rounded-xl hover:bg-midnightblue-600"
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
                      `${mode === "reset" ? "Reset" : "Create"} Password`
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

        {/* Right Section with Background Image (Hidden on Smaller Screens) */}
        <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen">
          <div className="mt-[20%] mr-[10%] bg-contain w-full flex items-center justify-center bg-gray-100">
            <img
              src={loginright}
              alt="Login background"
              className="object-fit object-center w-full h-full px-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
