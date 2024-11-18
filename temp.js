let rawResponse = "```json\n" +
    "{\n" +
    "  \"goodFit\": false,\n" +
    "  \"reason\": \"Based on the provided resume and Vermeer's job description, the applicant is not a good fit for the Embedded Software Engineer Intern role.  The resume highlights experience in software development primarily focused on backend systems, cloud technologies, and data analysis.  While the candidate possesses programming skills (Java, C++, Python, etc.), the job description emphasizes the need for experience with embedded C, microcontroller architectures, control systems, and specific test equipment. The candidate's projects, while impressive, don't directly demonstrate the required embedded systems expertise.\",\n" +
    "  \"upskillSuggestions\": [\n" +
    "    \"Gain practical experience with embedded C programming.\",\n" +
    "    \"Develop a strong understanding of microcontroller architectures (e.g., ARM Cortex-M).\",\n" +
    "    \"Learn about control system theory and its applications in embedded systems.\",\n" +
    "    \"Become proficient in using test equipment such as oscilloscopes, power supplies, and signal generators.\",\n" +
    "    \"Develop and complete a project that incorporates these skills – a personal project demonstrating familiarity with embedded systems development could strengthen your application considerably.\",\n" +
    "    \"Familiarize yourself with the specific technologies and platforms Vermeer uses. Researching their products and technologies will show initiative and a genuine interest in the company.\",\n" +
    "    \"Highlight any experience related to hardware or firmware development, even if it was part of a larger project. This will showcase relevant abilities.\"\n" +
    "  ],\n" +
    "  \"tellMeWhyToHireYou\": \"While the provided resume does not directly qualify you, should you gain relevant embedded systems experience, here's what to write:  'I'm a highly motivated and results-oriented software engineer with a proven track record of success in backend development and data analysis. While my experience is primarily backend-focused, I'm eager to transition into embedded systems. I've already started upskilling myself by learning [mention specific technologies learned] and completing a project where I [briefly describe a project demonstrating relevant skill].  I'm confident that my strong problem-solving abilities, coupled with my quick learning aptitude and dedication, will allow me to quickly master the required skills and become a valuable contributor to your team.'\"\n" +
    "}\n" +
    "```"
let cleanResponse = rawResponse.replace("```json", '').trim();
cleanResponse = cleanResponse.replace("```", '').trim();

console.log( cleanResponse);