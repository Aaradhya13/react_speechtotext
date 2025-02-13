require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define MongoDB Schema
const transcriptionSchema = new mongoose.Schema({
    audioUrl: String,
    transcription: String,
    createdAt: { type: Date, default: Date.now }
});

const Transcription = mongoose.model("Transcription", transcriptionSchema);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve Static Files (Uploaded Audio)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "./uploads/";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e5);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// ✅ Upload & Transcribe File API
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path;
        const fileName = req.file.filename;
        const audioUrl = `http://localhost:${PORT}/uploads/${fileName}`;

        console.log(`🔄 File uploaded: ${filePath}`);

        // ✅ Call Deepgram API for Transcription
        const transcription = await transcribeAudio(filePath);

        // ✅ Save to MongoDB
        await saveTranscription(audioUrl, transcription);

        // ✅ Cleanup Local File
        fs.unlinkSync(filePath);

        res.json({
            message: "✅ File uploaded and transcribed successfully",
            audioUrl,
            transcription
        });

    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Function to Call Deepgram API
const transcribeAudio = async (filePath) => {
    try {
        const audioData = fs.createReadStream(filePath);

        const response = await axios.post("https://api.deepgram.com/v1/listen", audioData, {
            headers: {
                Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
                "Content-Type": "audio/mpeg",
            },
            params: {
                model: "whisper-large",
                smart_format: true,
            },
        });

        return response.data.results.channels[0].alternatives[0].transcript || "No transcription found";
    } catch (err) {
        console.error("❌ Speech-to-text conversion failed:", err.response ? err.response.data : err.message);
        return "Transcription failed";
    }
};

// ✅ Function to Save Transcription in MongoDB
const saveTranscription = async (audioUrl, transcription) => {
    try {
        const newTranscription = new Transcription({ audioUrl, transcription });
        await newTranscription.save();
        console.log("✅ Transcription saved:", newTranscription);
    } catch (error) {
        console.error("❌ Error saving transcription:", error);
    }
};

app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});
app.get("/upload", (req, res) => {
    res.send("🛠️ Use POST method to upload files.");
});


// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
