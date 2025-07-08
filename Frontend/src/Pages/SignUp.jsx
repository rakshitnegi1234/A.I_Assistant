import React, { useContext, useRef, useState } from "react";
import styles from "../Styles/SignUp.module.css";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/userContext";
import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const name = useRef();
  const password = useRef();
  const email = useRef();
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (eve) => {
    eve.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      );

      setUserData(result.data);

      name.current.value = "";
      email.current.value = "";
      password.current.value = "";
      setLoading(false);
      navigate("/customize");
    } catch (err) {
      console.log(err);
      setErr(err.response.data.message);
      setUserData(null);
      setLoading(false);
    }
  };

  return (
    <div className={styles.backImage}>
      <form className={styles.SignUpForm} onSubmit={handleSignUp}>
        <h1 className="text-white text-[30px] font-semibold text-center">
          Register To <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full h-[50px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-[16px]"
          ref={name}
        />

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

        {err.length > 0 && (
          <p className="text-red-500 text-center mb-4 text-[17px]">{err}</p>
        )}

        <button
          type="submit"
          className="w-full h-[50px] bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Loading..." : "SignUp"}
        </button>

        <p
          className="text-[white] text-[18px]"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
