import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON and URL-encoded form data (for job description)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static('public'));
import cors from 'cors';
app.use(cors());
const schema = {
    description: "Am I a good fit?",
    type: SchemaType.OBJECT,
    properties: {
        isGoodFit: {
            type: SchemaType.BOOLEAN,
            description: "If they should hire you or not",
            nullable: false,
        },
        summary: {
            type: SchemaType.STRING,
            description: "summary of the resume",
            nullable: false,
        },
        aboutTheCompany: {
            type: SchemaType.STRING,
            description: "Brief info about the company like when was it founded, their domain, what are they known for, values and principles.",
            nullable: false,
        },
        comparison: {
            type: SchemaType.STRING,
            description: "comparing the resume and job description",
            nullable: false,
        },
        tellMeWhyHireYou: {
            type: SchemaType.STRING,
            description: "gemini will tell us why should the company hire you",
            nullable: false,
        },
        upSkillRecommendations: {
            type: SchemaType.STRING,
            description: "gemini will tell us what skills we should work on to get better",
            nullable: false,
        },
    },
    "required": ["isGoodFit","aboutTheCompany", "summary", "comparison", "tellMeWhyHireYou","upSkillRecommendations"]
};

// Initialize Google Generative AI API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
    },
});

app.post('/upload', upload.single('file'), async (req, res) => {
    // console.log("Api Called");

    try {
        const jobDescription = req.body.jobDescription;
        const filePath = req.file.path;
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: req.file.mimetype,
            displayName: req.file.originalname,
        });
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: `Can you summarize the content of this resume? and compare information related to the job description: ${jobDescription}. tell me if i am a good fit for the role or not. Also tell me what should i write for the question
            "Tell me why should we hire you?" Also tell me what should i learn to upskill  myself.` },
        ]);

        const resultText = await result.response.text();

        const resultJSON = JSON.parse(resultText);
        // console.log("ART: "+ resultJSON.toString() + ":END");
        res.json(resultJSON);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to process the file and job description' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

