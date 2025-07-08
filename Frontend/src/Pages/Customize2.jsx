import React, { useContext, useState } from "react";
import { userDataContext } from "../Context/userContext";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const { userData, backendImage, selectedImage, setUserData, serverUrl } =
    useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage instanceof File) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      setLoading(false);
      setUserData(result.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center gap-10 relative ">
      <IoArrowBackOutline
        className="absolute top-[30px] left-[30px] text-white  w-[25px] h-[25px] cursor-pointer"
        onClick={() => {
          navigate("/customize");
        }}
      />

      <h1 className="text-white text-[30px] text-center">
        Enter your <span className="text-blue-400">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="eg. PHOENIX"
        className="w-full max-w-[600px] h-[50px] outline-none border border-white bg-transparent text-white placeholder-gray-300 px-4 rounded-full text-[16px]"
        onChange={(e) => {
          setAssistantName(e.target.value);
        }}
        value={assistantName}
      />

      {assistantName && (
        <button
          type="Click"
          className="w-[200px] h-[50px] mt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold cursor-pointer"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Create Your A.I" : "Loading"}
        </button>
      )}
    </div>
  );
}

export default Customize2;
