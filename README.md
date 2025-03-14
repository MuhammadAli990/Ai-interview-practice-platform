# 🎤 AI Interview Practice Platform:

Welcome to **AI Interviewer**! This platform helps you prepare and practice for your next interview in a realistic, AI-powered environment that simulates a real online interview.🌟

## 🚀 Features

- **Personalized Interview Questions**: The website asks you for your job role, job description, and years of experience, and then uses AI to generate 5 interview questions ranging from easy to hard. 📝
- **Realistic Interview Environment**: 
  - You can read the questions or use a built-in button to have the website speak them for you just like in a real interview! 🎙️
  - Webcam and microphone permissions are requested to create a realistic interview environment. 📷🎤 (Webcam is optional, microphone is required to record your answers.)
- **AI-Generated Report**: After you answer the questions, the AI will generate a report with:
  - Total score out of 100 ✅
  - Individual ratings for each question (out of 10) ⭐
  - Feedback on your answers 🗣️
  - The ideal answer to each question 📚

## 🛠️ Tech Stack

- **Next.js 14**: The framework used to build the app 🚀
- **Gemini API**: The AI engine generates personalized interview questions and provides detailed reports based on your answers to help you improve 🤖
- **Tailwind CSS**: For styling the website ⚡
- **ShadCN**: For UI components and interactions ✨
- **Clerk**: For authentication 🔐
- **MongoDB**: Database to store your generated interviews and reports 💾
- **React-Webcam**: For accessing the user's webcam 📸
- **React-Hook-Speech-To-Text**: For converting speech into text using Web Speech API 🗣️➡️📝
- **Web Speech API**: For speaking the interview questions to you 🎤

## ⚙️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ai-interview-practice.git
2. Navigate to the project folder:
   ```bash
   cd Ai-Interview-Practice-Platform
3. Install the dependencies:
    ```bash
    npm install
4. Create a .env file in the root directory and add the following environment variables:
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    MONGODB_URI=your-mongo-db-uri
    NEXT_PUBLIC_GEMINI_KEY=your-gemini-api-key
5. Start the development server:
    ```bash
    npm run dev
6. Open the app in your browser:
    ```bash
    http://localhost:3000
