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

// Serve static files from the "public-old" folder
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
    "required": ["isGoodFit", "summary", "comparison", "tellMeWhyHireYou","upSkillRecommendations"]
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
        // const jobDescription = req.body.jobDescription;
        // const filePath = req.file.path;
        // const uploadResponse = await fileManager.uploadFile(filePath, {
        //     mimeType: req.file.mimetype,
        //     displayName: req.file.originalname,
        // });
        // const result = await model.generateContent([
        //     {
        //         fileData: {
        //             mimeType: uploadResponse.file.mimeType,
        //             fileUri: uploadResponse.file.uri,
        //         },
        //     },
        //     { text: `Can you summarize the content of this resume? and compare information related to the job description: ${req.body.jobDescription}. tell me if i am a good fit for the role or not. If yes the tell me what should i write for the question
        //     "Tell me why should we hire you?" If no then tell me what should i learn to upskill  myself.` },
        // ]);

        // const resultText = await result.response.text();
        // console.log("ARaaaaT: "+ resultText + ":ENaaaaD");
        const resultText = "{\"comparison\": \"The resume shows a strong candidate with relevant skills and experience.  The candidate has experience with various programming languages (Java, C++, Python, etc.), databases (MySQL, MongoDB), cloud technologies (AWS, Google Cloud), and has worked on several projects that align well with the requirements of the job description. The projects demonstrate experience in building scalable systems, handling large datasets, and using machine learning. The resume highlights skills in data structures and algorithms, which are also required. However, the candidate's experience is not directly related to real-time information-sharing applications.\", \"isGoodFit\": true, \"summary\": \"Apoorv Lodhi's resume showcases a strong academic background and practical experience in software development.  His projects demonstrate expertise in various programming languages, databases, cloud technologies, and data analysis.  His internships at CARS24 and OLA Electric highlight achievements in improving system efficiency, enhancing user experience, and streamlining processes. His skills in data structures and algorithms, coupled with experience in distributed systems, make him a suitable candidate for many software engineering roles.\", \"tellMeWhyHireYou\": \"I am a strong fit for this software engineering internship because my skills and experience align well with the requirements. My projects in sentiment analysis, social media application development, and e-commerce platform creation demonstrate my ability to build full-stack applications, handle large datasets, and design scalable systems. My experience with cloud technologies like AWS and Google Cloud, along with my proficiency in Java, Python, and other programming languages, will enable me to quickly adapt to your team's workflow and contribute meaningfully.  Furthermore, my internships at CARS24 and OLA Electric honed my skills in improving system efficiency, enhancing user experience, and streamlining operations, which are directly relevant to creating an effective real-time information sharing platform. I'm eager to learn and contribute to a challenging and innovative environment like X.\", \"upSkillRecommendations\": \"To further strengthen your candidacy, consider focusing on skills directly relevant to real-time information sharing and large-scale distributed systems.  Consider these areas for upskilling:  \\n\\n* **Real-time communication technologies:** Learn about technologies like WebSockets, Server-Sent Events (SSE), or message queues (e.g., Kafka, RabbitMQ) used for building real-time applications. \\n* **Scalable backend systems:** Gain experience with designing and implementing highly scalable backend systems that can handle a large volume of concurrent users and data. Explore microservices architecture and distributed databases. \\n* **Data streaming and processing:** Familiarize yourself with technologies and techniques for real-time data processing using frameworks like Apache Spark or Apache Flink. \\n* **Experience with specific X technologies:** If possible, research the specific technologies used at X (mention if any are listed in further job description details) and try to acquire some experience with them.  \\n* **Specifically, if the job description involves large language models (LLMs), then you should highlight projects or skills in that area.**\"\n" +
            "}";
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

