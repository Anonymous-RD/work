import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginright from "../../assets/login/login-right.png";
import axios from "axios";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Qr from "./Qr";
function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { qrCode, isMfaSetup, isMfaVerified, loading, error, user } =
    useSelector((state) => state.auth);
  console.log(user);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(registerUser({ email, password })).unwrap();

      // Navigate based on the response from the registerUser action
      if (res.mfaSetup) {
        // If MFA setup is required, stay on the page to display the QR code
        console.log("MFA setup needed");
      } else if (res.mfaRequired) {
        // If MFA is already set up, navigate to the OTP verification page
        navigate("/verify-otp");
      } else {
        // Successful registration without MFA requirement
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error during registration");
    }
  };

  return (
    <div>
      {!isMfaSetup ? (
        <div className="flex overflow-hidden flex-col  pr-10 pl-[60px] bg-white max-md:px-5 max-md:pb-24 mt-0">
          <div className=" self-start text-[30px] font-semibold text-gray-800 w-[174px]">
            IPEL Projects
          </div>
          <div className="self-end mt-24 w-full max-w-[1267px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-20 max-md:flex-col">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col max-md:mt-10">
                  <div className="flex flex-col self-start">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome back
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                      Welcome back! Please enter your details
                    </p>
                  </div>
                  <form
                    // onSubmit={onHandler}
                    className="flex flex-col mt-6 w-full max-w-[404px]"
                  >
                    <div className="flex flex-col w-full ">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                          required
                        />
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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="gap-6 self-stretch pt-4 pr-6 pb-4 pl-5 w-full text-gray-500 rounded-xl border border-solid border-zinc-100 max-md:pr-5"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-10 justify-between items-center mt-5 w-full text-sm font-medium text-gray-800">
                      <div className="flex gap-2.5 items-center self-stretch my-auto">
                        <input
                          type="checkbox"
                          name="rememberme"
                          id="rememberMe"
                          //   checked={rememberMe}
                          // onChange={onHandler}
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
                          onClick={handleRegister}
                          // type="submit"
                          className="gap-2.5 self-stretch px-5 py-3.5 w-full bg-lime-300 rounded-xl  hover:bg-orange-300"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src={loginright}
                  alt="Background"
                  className="object-contain grow mt-1.5 w-full aspect-[1.65] max-md:mt-10 max-md:max-w-full"
                />
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
