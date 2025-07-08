import React, { useContext, useRef, useState } from "react";
import styles from "../Styles/SignUp.module.css";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/userContext";
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const password = useRef();
  const email = useRef();
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (eve) => {
    eve.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      );

      email.current.value = "";
      password.current.value = "";
      setUserData(result.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setUserData(null);
      setLoading(false);
      setErr(err.response.data.message);
    }
  };

  return (
    <div className={styles.backImage}>
      <form className={styles.SignUpForm} onSubmit={handleSignIn}>
        <h1 className="text-white text-[30px] font-semibold text-center">
          Sign In To <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full h-[50px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-[16px]"
          ref={email}
        />

        <div className=" w-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full h-[50px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-[16px]"
            ref={password}
          />

          {!showPassword ? (
            <IoEye
              className="absolute top-[15px] right-[20px] text-[white] w-[25px] h-[25px]"
              onClick={() => {
                setShowPassword(true);
              }}
            />
          ) : (
            <IoEyeOff
              className="absolute top-[15px] right-[20px] text-[white] w-[25px] h-[25px]"
              onClick={() => {
                setShowPassword(false);
              }}
            />
          )}
        </div>

        {err && (
          <p className="text-red-500 text-center mb-4 text-[17px]">{err}</p>
        )}

        <button
          type="submit"
          className="w-full h-[50px] bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className="text-[white] text-[18px]"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Want To Create A New Account?{" "}
          <span className="text-blue-400 cursor-pointer">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
