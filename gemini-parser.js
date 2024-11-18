import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const model = genAI.getGenerativeModel({
    // Choose a Gemini model.
    model: "gemini-1.5-flash",
});

// Upload the file and specify a display name.
const uploadResponse = await fileManager.uploadFile("media/gemini.pdf", {
    mimeType: "application/pdf",
    displayName: "Gemini 1.5 PDF",
});

// View the response.
console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
);

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
        fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
        },
    },
    { text: "Can you summarize the content of this resume? I do not need bullet points. I want you to summerize it so that i am able to explain it to some third person clearly. Also explain his experience in the companies he worked on.  im ean tell me more about the companies. i dont want you use etc anywhere. give the complete list of skills and explain it as much as you can" },
]);

// Output the generated text to the console
console.log(result.response.text());
