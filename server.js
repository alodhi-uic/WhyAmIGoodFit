import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
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

// Initialize Google Generative AI API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint to handle file upload and job description
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log("Api Called");

    try {
        // Access the job description from the request body
        const jobDescription = req.body.jobDescription;
        // console.log('Job Description:', jobDescription); // Print the job description to the console

        const filePath = req.file.path;

        // Upload the file to Google AI
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: req.file.mimetype,
            displayName: req.file.originalname,
        });

        // Generate content using the uploaded file and job description
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: `Can you summarize the content of this resume? and compare information related to the job description: ${req.body.jobDescription}. tell me if i am a good fit for the role or not. If yes the tell me what should i write for the question
            "Tell me why should we hire you?" If no then tell me what should i learn to upskill  myself.

            I want the response in json format` },
        ]);

        console.log("EP0:" + result.response.toString() + ":ENDD" );

        // Send the generated summary back to the client
        let rawResponse = result.response.text();
       // console.log("EP1:" + result.response.text() + ":ENDD" );
       //  let rawResponse = "```json\n" +
       //      "{\n" +
       //      "  \"goodFit\": false,\n" +
       //      "  \"reason\": \"The resume demonstrates strong software engineering skills, particularly in backend development and experience with various technologies (Java, C++, Python, databases, cloud platforms), which are not directly relevant to the Vermeer Embedded Software Engineer Intern position. The required skills for the Vermeer position emphasize embedded systems, microcontroller architectures, control system theory, and Embedded C programming, areas where the applicant's resume lacks demonstrable experience.\",\n" +
       //      "  \"upskillRecommendations\": [\n" +
       //      "    \"Embedded C programming\",\n" +
       //      "    \"Microcontroller architectures (e.g., ARM Cortex-M)\",\n" +
       //      "    \"Real-time operating systems (RTOS)\",\n" +
       //      "    \"Control system theory and applications\",\n" +
       //      "    \"Schematic reading and understanding of electronic circuits\",\n" +
       //      "    \"Experience with embedded system debugging tools and techniques\",\n" +
       //      "    \"Familiarity with common embedded hardware (e.g., sensors, actuators)\",\n" +
       //      "    \"Hands-on experience with test equipment (e.g., oscilloscopes, signal generators, power supplies)\"\n" +
       //      "  ],\n" +
       //      "  \"tellMeWhyShouldWeHireYouResponse\": \"While my resume showcases expertise in software development, it currently lacks the specific embedded systems experience required for this role.  However, I am a highly motivated and quick learner with a strong foundation in programming and software development principles. I am eager to develop my skills in embedded systems and quickly acquire the necessary expertise to make a significant contribution to your team. I am confident that my ability to rapidly learn new technologies and my strong problem-solving skills would enable me to quickly adapt and excel in this position.  I'm committed to dedicating the time and effort to learn Embedded C programming and the other required skills, and I am confident I can become a valuable asset to your team.\"\n" +
       //      "}\n" +
       //      "```";
        // let cleanResponse = rawResponse.replace("``` json", '').trim();
        // cleanResponse = cleanResponse.replace("```", '').trim();
       //
       //  console.log("cleanResponse: " + cleanResponse  + " :arcane");

        let cleanResponse = rawResponse.replace("```json", '').trim();
        cleanResponse = cleanResponse.replace("```", '').trim();



//         let parsedResponse;
//         try {
//             console.log("EP122:" + result)
//             parsedResponse = JSON.parse(result.response.text.toString());
//         } catch (parseError) {
//             console.error("Error parsing JSON response:", parseError);
//             return res.status(500).json({ error: 'Invalid JSON response from model' });
//         }
// console.log(parsedResponse);
        // Send the parsed JSON summary back to the client
        // console.log(cleanResponse);
        console.log("ENDD cleanResponse");
        let parsedResponse = JSON.parse(cleanResponse.toString());
        // cleanResponse = { "goodFit": false, "reason": "Based ", "tellMeWhyToHireYou": "While team." };
        res.json(parsedResponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to process the file and job description' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

