import React, { useContext, useEffect, useState, useRef } from "react";
import { userDataContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import imageAI from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/AI technology product loading animation＃1.gif";

import userwali from "/home/rakshit/Documents/A.I_Assistant/Frontend/src/assets/assets-20250706T054540Z-1-001/assets/user.gif";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();

  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const recognitionRef = useRef(null);

  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      navigate("/signin");
      setUserData(null);
    } catch (err) {
      setUserData(null);
      console.log(err);
    }
  };

  const speak = (text) => {
    isSpeakingRef.current = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();

    const hindiVoice = voices.find((v) => v.lang === "hi-IN");

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    synth.speak(utterance);

    utterance.onend = () => {
      isSpeakingRef.current = false;

      // ✅ Check before starting recognition again
      if (!isRecognizingRef.current) {
        try {
          recognitionRef.current?.start();
        } catch (err) {
          if (err.name === "InvalidStateError") {
            console.warn(
              "⛔ Tried to start recognition after speech, but it was already running."
            );
          } else {
            console.error("🔁 Recognition restart failed:", err);
          }
        }
      }
    };
  };

  const cleanQuery = (input) => {
    let text = input.toLowerCase();

    // Remove common filler phrases
    text = text.replace(
      /(search|find|look up|on youtube|on google|tell me|show me|what is|current|please|the weather of|the|a|an)/g,
      ""
    );

    // Remove extra whitespaces
    return text.replace(/\s+/g, " ").trim();
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    // Add to history

    speak(response);

    setUserData((prev) => ({
      ...prev,
      history: [...(prev?.history || []), `👤 ${userInput}`, `🤖 ${response}`],
    }));

    const query = encodeURIComponent(cleanQuery(userInput));

    if (type === "Google Search") {
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (type === "Youtube" || type === "youtube_play") {
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    } else if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    } else if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    } else if (type === "weather-show") {
      window.open(
        `https://www.google.com/search?q=current weather ${query}`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    if (!userData?.assistantName) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    const safeRecognition = () => {
      const recog = recognitionRef.current;
      if (!recog) return;

      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recog.start();
          console.log("🎤 recognition starts");
        } catch (err) {
          if (err.name === "InvalidStateError") {
            console.warn(
              "⛔ Tried to start recognition while it was already running."
            );
          } else {
            console.error("⚠️ safeRecognition error:", err);
          }
        }
      } else {
        console.log(
          "🚫 Cannot start recognition. Speaking:",
          isSpeakingRef.current,
          "Listening:",
          isRecognizingRef.current
        );
      }
    };

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (!isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("🎙️ Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(safeRecognition, 2000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      setUserText(transcript);
      setAiText("");
      console.log("📝 Heard:", transcript);

      if (
        userData?.assistantName &&
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setUserText("");
        setAiText(data.response);
      }
    };

    // Delay initial recognition start slightly
    const startTimeout = setTimeout(() => {
      safeRecognition();
    }, 1500);

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition();
      }
    }, 10000);

    // Cleanup
    return () => {
      clearTimeout(startTimeout);
      clearInterval(fallback);
      recognition.stop();
      recognitionRef.current = null;
      isRecognizingRef.current = false;
      setListening(false);
    };
  }, [userData?.assistantName]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center gap-10">
      <div className="absolute top-5 right-5 flex flex-col gap-4">
        <button
          className="min-w-[150px] h-[50px] text-black font-semibold bg-white rounded-full text-[16px] shadow-md hover:bg-gray-100 transition cursor-pointer"
          onClick={() => {
            handleLogOut();
          }}
        >
          Log Out
        </button>
        <button
          className="min-w-[150px] h-[50px] text-black font-semibold bg-white rounded-full text-[16px] shadow-md hover:bg-gray-100 transition cursor-pointer"
          onClick={() => {
            navigate("/customize");
          }}
        >
          Customize Your A.I
        </button>
      </div>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>

      <h1 className="text-white text-[18px] font-semibold">
      {userData.assistantName ? `I am ${userData.assistantName}` : null}

      </h1>
      {showHistory && (
        <div className="w-[90%] max-w-[600px] h-[250px] bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4 overflow-auto">
          <h1 className="text-white font-semibold text-[19px] mb-2">History</h1>
          <div className="flex flex-col gap-2">
            {userData?.history && userData.history.length > 0 ? (
              userData.history.map((his, idx) => (
                <span key={idx} className="text-gray-200 text-[16px] truncate">
                  {his}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">
                No history available.
              </span>
            )}
          </div>
        </div>
      )}

      <button
        className="min-w-[150px] h-[50px] text-black font-semibold bg-white rounded-full text-[16px] shadow-md hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {!aiText && <img src={imageAI} className="w-[200px]" />}
      {aiText && <img src={userwali} className="w-[200px]" />}
    </div>
  );
}

export default Home;
