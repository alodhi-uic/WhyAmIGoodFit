## Devpost | YT Link
  https://devpost.com/software/am-i-a-good-fit


## Inspiration

The inspiration for this project came from observing the struggles of students and professionals, including myself, in the highly competitive job market, particularly when applying for summer internships in the tech industry. I have seen people submitting over 1,000 applications and still facing rejection in almost all of them.
I have seen numerous people post on Reddit/csMajors about the number of companies they have applied to and the offers received by them. 
Ex: https://www.reddit.com/r/csMajors/comments/1h49fea/been_applying_since_summer_and_finally_got_an/?rdt=35106


This led me to wonder: **why is this happening?** The core problem often lies in the mismatch between candidates' skills and the requirements of the roles they apply for. Sometimes their resumes lack the necessary updates or do not align with the specific job descriptions provided by companies. This realization motivated me to create a solution that simplifies the process and improves the chances of securing the right job.

##What it does

"Why Am I a Good Fit?" is an AI-powered application that helps users determine whether they are a good match for a specific job. Here's how it works:

Job Description Summarization: The application takes the job description (JD) as input and generates a concise summary. This allows candidates to quickly grasp the main points of the JD. Users can choose how the summary is presented, with options like key points, TL;DR, or headline formats, and can customize the length and format.

Resume Targeting: Using the Gemini Flash model, the application compares the uploaded resume with the summarized job description. The AI generates detailed feedback according to a predefined schema, making it easier to parse and present the insights.

Personalized Fit Analysis: The application provides a tailored answer to the question, "Why am I a good fit?" This response can be directly used in cover letters to increase the chances of getting shortlisted for interviews.

Rewriting and Enhancements: Integrated with Gemini Nano's prompt API, the application enables candidates to refine the generated response further. Users can rewrite the answer to suit their preferences or add additional details, such as certifications, extracurricular activities, or achievements not included in their resumes.

By leveraging these features, the app empowers job seekers to craft targeted and impactful applications, improving their likelihood of success.

## How I built it

This project makes extensive use of Google Chrome's built-in AI capabilities powered by Gemini Nano. Specifically, it leverages the summarization API, prompt API, and rewrite API to provide a seamless user experience. These tools allow the application to:

Summarize job descriptions effectively, presenting the information in customizable formats like key points, TL;DR, or headlines.

Enable candidates to refine and personalize AI-generated answers to better align with their needs and highlight additional details.

Additionally, the project incorporates the Gemini 1.5 Flash model to parse resumes in PDF format and compare them with job descriptions. The model generates detailed insights following a predefined schema, making the results easier to parse and present. By combining these technologies, the application ensures accurate analysis and actionable feedback for job seekers.

## Challenges I ran into

Building this project presented several challenges:

From Chrome Extension to Server-Based Application: Initially, I aimed to develop this as a Chrome extension, allowing users to process everything locally without requiring a server. However, I couldn’t find a proper way to parse PDF resumes using Gemini Nano or generate insights in a predefined schema. This led me to adopt the Gemini Flash model for handling these tasks.

Rewrite API Issues: The rewrite API occasionally behaved unpredictably, and the lack of comprehensive documentation made debugging difficult. After consulting with the developer community on Discord, I was advised to use the prompt API for rewriting. This not only resolved the issue but also enhanced the application by creating a conversational feel with the AI for generating responses to the "Why should we hire you?" question, Gemini Nano remembers what user has asked earlier and incorporates that in the answer as well.

Solo Development: This was my first hackathon as a solo participant, and balancing all aspects of development was challenging. Being primarily a backend developer, I faced difficulties in creating a dynamic and visually appealing UI for the app. However, this challenge also pushed me to improve my frontend skills. (This was totally on me though ;))

## Accomplishments that we're proud of

- Successfully integrating AI to provide tailored, actionable feedback for job applications.
- Designing a system that is user-friendly and adaptable to different industries and roles.
- Creating a structured schema that enables efficient parsing and analysis of AI responses.
- Addressing a real-world problem that impacts many job seekers, providing them with a tool to improve their application strategies.

## What I learned

This project taught me valuable lessons about building AI-driven applications:

- The complexities of working with diverse and unstructured data, such as resumes and job descriptions.
- How to design effective schemas to standardize AI outputs for further processing.

## What's next for "Why Am I a Good Fit?"

Looking ahead, there are several exciting possibilities for this project:

1. Converting the App into a Chrome Extension: The goal is to eliminate the need for users to manually paste job descriptions. Instead, the extension will automatically crawl, parse, and summarize job descriptions directly from application pages.

2. Interactive Response Boxes: Each response box, such as the job description summary, will integrate with the prompt API, I have few UI structure in my mind will need a team to build it. This feature will allow users to hover over the summary and ask questions or seek clarifications via a text box that initiates an independent conversation with the Gemini. Similarly, for the upskill recommendation section, users can query the AI about suggested skills, ask for resources, or inquire about the relevance of a particular skill.

3. We can also incorporate Translation API to translate a Job description which is in some alien language to us. Fill the application and then again write a cover letter to the hiring manager using translation api again. Now I think that is cool.

This project has limitless possibilities and this be benefit everyone who is searching for a new job or a job change no matter the industry.

