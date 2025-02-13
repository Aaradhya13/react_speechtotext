# Speech-to-Text Web Application  

This project is a Speech-to-Text web application that allows users to upload or record audio and receive a transcribed text response. It consists of:  

## 🖥️ Frontend  
- Built with React for an interactive UI.  

## 🔧 Backend  
- Built using Express, MongoDB, and Multer for file uploads.  
- Deepgram handles the speech-to-text transcription.  

## 🔐 Authentication  
- Managed using JWT and bcrypt.  

## 🚀 Deployment  

### 🌍 Backend API  
🔗 **[Speech-to-Text API](https://speechtotext-1.onrender.com)**  

### 🎨 Frontend  
- Hosted on Vercel (https://speechtotextas.vercel.app/)  

## 📌 Features  
- 🎵 Upload audio files for transcription  
- 🎙️ Record audio in real-time  
- 📝 Display transcribed text  
- 🔐 Secure authentication using JWT  
- 📡 RESTful API for audio processing  

## 🏗️ Project Setup  

### 📂 Backend Setup (Express + MongoDB)  

#### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-repo/speech-to-text.git
cd speech-to-text/backend

#### 2️⃣ Install Dependencies
```bash
npm install

#### 3️⃣ Create a .env file
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DEEPGRAM_API_KEY=your_deepgram_api_key

#### 4️⃣ Start the Server
```bash
npm start

Backend will run on: http://localhost:5000
