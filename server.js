import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "public" folder
app.use(express.static('public'));
import cors from 'cors';
app.use(cors());


// Initialize Google Generative AI API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log("api called");
    try {
        const filePath = req.file.path;

        // Upload the file to Google AI
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: req.file.mimetype,
            displayName: req.file.originalname,
        });

        // Generate content using the uploaded file
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: "Can you summarize the content of this resume?..." },
        ]);

        // Send the generated summary back to the client
        res.json({ summary: result.response.text() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to process the file' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
