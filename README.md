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
git clone https://github.com/Aaradhya13/react_speechtotext.git
cd react_speechtotext/backend
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Create a .env file
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DEEPGRAM_API_KEY=your_deepgram_api_key
```

#### 4️⃣ Start the Server
```bash
npm start
```

Backend will run on: http://localhost:5000

### 🎨 Frontend Setup (React)
#### 1️⃣ Navigate to the Frontend Directory
```bash
cd ../frontend
```
#### 2️⃣ Install Dependencies
```bash
npm install
```
#### 3️⃣ Create a .env file
```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```
#### 4️⃣ Start the Frontend
```bash
npm start
```
Frontend will run on: http://localhost:3000

## 📌 API Usage  

### 🎤 Upload an Audio File  
To test the API, send a `POST` request using Postman or any API testing tool.  

**🔹 Endpoint:**  https://speechtotext-1.onrender.com/upload

### 🔧 Request Configuration  
- **Method:** `POST`  
- **URL:** `https://speechtotext-1.onrender.com/upload`  
- **Body Type:** `form-data`  
- **Key:** `file` (Type: File)  
- **Select an audio file** and click `Send`


### 📩 Response  
On successful upload and transcription, the API will return a JSON response containing:  

```json
{
"message": "✅ File uploaded and transcribed successfully",
  "audioUrl": "<URL of uploaded audio file>",
  "transcription": "<Transcribed text from the audio>"
}
```

## 🚀 Deployment Steps
### 🌐 Deploy Backend (Render, Heroku, etc.)
1. Push the backend code to GitHub.
2. Deploy on Render, Heroku, or any cloud platform.
 3. Set up the required environment variables.   
4️. Update REACT_APP_API_BASE_URL in the frontend .env file with the deployed backend URL.

### 🎨 Deploy Frontend (Netlify, Vercel, etc.)
1️. Push the frontend code to GitHub.
2️. Deploy on Netlify or Vercel.
3️. Update the backend API URL in .env before deploying.
