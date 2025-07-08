import React, { useContext, useRef } from "react";
import Card from "../Component/Card";
import { FaImage } from "react-icons/fa";
import { userDataContext } from "../Context/userContext";
import { IoArrowBackOutline } from "react-icons/io5";

import image1 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image1.png";
import image2 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image2.jpg";
import image4 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image4.png";
import image5 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image5.png";
import image6 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image6.jpeg";
import image7 from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/image7.jpeg";
import { useNavigate } from "react-router-dom";

function Customize() {
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const inputImage = useRef(null);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);

    setFrontendImage(URL.createObjectURL(file));

    setSelectedImage("input"); // set selection to input
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center gap-10">
      <IoArrowBackOutline
        className="absolute top-[30px] left-[30px] text-white  w-[25px] h-[25px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 className="text-white text-[30px] text-center">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>

      <div className="flex justify-center items-center flex-wrap gap-4 max-w-[90%]">
        {/* Predefined Cards */}
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload Image Card */}
        <div
          className={`w-[90px] h-[160px] lg:w-[160px] lg:h-[280px] 
            bg-[#030326] border-2 rounded-2xl overflow-hidden 
            flex items-center justify-center cursor-pointer 
            hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white
            ${
              selectedImage === "input"
                ? "border-4 border-white shadow-2xl shadow-blue-950"
                : "border-blue-500"
            }`}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage ? (
            <FaImage className="text-white w-[25px] h-[25px]" />
          ) : (
            <img
              src={frontendImage}
              className="h-full w-full object-cover"
              alt="Custom Upload"
            />
          )}
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={handleImage}
        />
      </div>

      {selectedImage && (
        <button
          type="Click"
          className="w-[200px] h-[50px] mt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold cursor-pointer"
          onClick={() => {
            navigate("/customize2");
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
