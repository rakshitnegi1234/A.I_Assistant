import React, { useContext } from "react";
import { userDataContext } from "../Context/userContext";

function Card({ image }) {
  const { selectedImage, setSelectedImage, setBackendImage, setFrontendImage } =
    useContext(userDataContext);

  return (
    <div
      className={`w-[90px] h-[160px] lg:w-[160px] lg:h-[280px] bg-[#020220] border-2 rounded-2xl overflow-hidden 
      cursor-pointer transition hover:shadow-2xl hover:shadow-blue-950 
      ${
        selectedImage === image
          ? "border-white border-4 shadow-blue-900"
          : "border-[#000ff66]"
      }`}
      onClick={() => {
        setSelectedImage(image), setBackendImage(null), setFrontendImage(null);
      }}
    >
      <img
        src={image}
        className="h-full w-full object-cover"
        alt="Assistant Option"
      />
    </div>
  );
}

export default Card;
