import React, { useState, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaStop, FaUpload, FaArrowLeft } from "react-icons/fa";

const AudioUploader = ({ onBack }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
      setTranscription("");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([audioBlob], "recording.webm", { type: "audio/webm" });
        setAudioFile(file);
        setTranscription("");
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      alert("Microphone access denied or not supported.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const uploadFile = async () => {
    if (!audioFile) {
      alert("Please select or record an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      setLoading(true);
      setTranscription("");
      const response = await axios.post("http://localhost:5000/upload", formData);
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload and transcribe the audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Upload or Record Audio</h2>

        <label className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <FaUpload className="text-black mr-3 text-xl" />
          <span className="text-black font-medium">Choose File</span>
          <input type="file" className="hidden" accept="audio/*" onChange={handleFileChange} />
        </label>

        {audioFile && <p className="text-sm text-gray-600 mt-2 text-center">Selected File: {audioFile.name}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={startRecording}
            className={`flex items-center justify-center px-4 py-2 w-40 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium transition ${recording ? "cursor-not-allowed" : ""}`}
            disabled={recording}
          >
            <FaMicrophone className="mr-2 text-black text-lg" />
            Start Recording
          </button>

          <button
            onClick={stopRecording}
            className={`flex items-center justify-center px-4 py-2 w-40 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium transition ${!recording ? "cursor-not-allowed" : ""}`}
            disabled={!recording}
          >
            <FaStop className="mr-2 text-black text-lg" />
            Stop
          </button>
        </div>

        <button onClick={uploadFile} className="w-full mt-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg transition" disabled={loading}>
          {loading ? "Uploading..." : "Upload & Transcribe"}
        </button>

        {transcription && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Transcription:</h3>
            <p className="text-gray-700">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
