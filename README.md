# 🤖 AI Virtual Assistant

A voice-enabled AI assistant powered by Gemini AI and Web Speech API, allowing users to interact in real time using natural voice commands. Built with the MERN stack, this assistant supports custom avatars, multi-user profiles, and intelligent intent handling.

## 🚀 Features

- 🎤 **Real-time Speech Recognition** using the Web Speech API
- 🧠 **Gemini AI Integration** for intelligent and contextual responses
- 🔐 **Secure Authentication** with JWT and bcrypt password hashing
- 🧍‍♂️ **Multi-user Support** with persistent customization (name, avatar, voice)
- 🗣️ **Smart Speech Synthesis** with dynamic voice replies (Hindi supported)
- 🎯 **12+ Intent Types** including Google search, YouTube play, weather, jokes, calculator, Instagram, and more
- 📤 **Custom Avatar Upload** using Multer + Cloudinary
- 🧩 **Robust Prompt Engineering** to convert voice to structured commands
- 🔄 **Continuous Listening** with fallback recovery and error handling

## 🧪 Tech Stack

- **Frontend:** React, TailwindCSS, Web Speech API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **AI Engine:** Gemini AI (Google Generative API)
- **Authentication:** JWT, bcrypt
- **Media:** Multer for file uploads, Cloudinary for storage

🧠 How It Works
The app uses SpeechRecognition to capture user voice input.

The spoken text is converted into a transcript and sent to the backend.

Gemini AI returns a structured JSON with:

Type (e.g., search, weather, calculator)

User input

AI-generated response

Based on the intent, the app responds:

Speaks the answer back

Opens appropriate URLs (e.g., Google, YouTube)

Saves chat history for the user



🛡️ Edge Case Handling
✅ Prevents race conditions (e.g., recognition starts before assistant is ready)

🎙️ Mic fallback recovery using setInterval() every 10s if recognition stops

🔐 Mic permission errors handled gracefully with console warnings

🔁 Avoids multiple recognition.start() calls using useRef flags

📚 Future Improvements
🎤 Add multilingual support (Hinglish, Tamil, etc.)

💬 Save history to MongoDB permanently

💡 Add text-based assistant fallback for accessibility

📲 Mobile responsiveness and offline fallback

🤝 Contributing
Pull requests are welcome! Feel free to open an issue to suggest new features or report bugs.


✅ Let me know if you want:
- A version with **badges** (Tech used, Live status)
- Markdown anchors for table of contents
- Resume/project descriptions or blog write-up help

Just replace the GitHub repo link and deployment link before publishing.








## 📦 Installation

### 1. Clone the repository

IN BASH:
git clone https://github.com/your-username/ai-virtual-assistant.git
cd ai-virtual-assistant



2. Set up the backend
cd Backend
npm install

Create a .env file inside Backend/ with the following:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Then start the backend:
npm start

3. Set up the frontend
bash
Copy
Edit
cd ../Frontend
npm install
npm start




---

✅ Let me know if you want:
- A version with **badges** (Tech used, MIT License, Live status)
- A short **demo walkthrough GIF** (using Licecap or Loom)
- Markdown anchors for table of contents
- Resume/project descriptions or blog write-up help

Just replace the GitHub repo link and deployment link before publishing.
