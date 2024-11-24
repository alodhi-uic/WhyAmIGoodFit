document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get required elements
    const spinner = document.getElementById('spinner');
    const response = document.getElementById('response');
    // const responseBox = document.getElementById('responseBox');

    // Check if required elements exist
    if (!spinner || !response || !responseBox) {
        console.error("One or more required elements are missing from the HTML.");
        return;
    }

    // Show the spinner while waiting for the response
    spinner.style.display = 'block';
    response.textContent = '';  // Clear any previous responses

    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("jobDescription", document.getElementById("jobDescription").value);

    try {
        // Send the request to the server
        const res = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        // const data = {
        //     "goodFit": false,
        //     "reason": "The resume demonstrates strong software engineering skills, particularly in backend development and experience with various technologies (Java, C++, Python, databases, cloud platforms), which are not directly relevant to the Vermeer Embedded Software Engineer Intern position. The required skills for the Vermeer position emphasize embedded systems, microcontroller architectures, control system theory, and Embedded C programming, areas where the applicant's resume lacks demonstrable experience.",
        //     "tellMeWhyShouldWeHireYouResponse": "While my resume showcases expertise in software development, it currently lacks the specific embedded systems experience required for this role.  However, I am a highly motivated and quick learner with a strong foundation in programming and software development principles. I am eager to develop my skills in embedded systems and quickly acquire the necessary expertise to make a significant contribution to your team. I am confident that my ability to rapidly learn new technologies and my strong problem-solving skills would enable me to quickly adapt and excel in this position.  I'm committed to dedicating the time and effort to learn Embedded C programming and the other required skills, and I am confident I can become a valuable asset to your team."
        // }


        // Hide the spinner once the response is received
        spinner.style.display = 'none';

        // Clear any previous response content
        const responseBox = document.getElementById("responseBox");

// Clear the existing content
        responseBox.innerHTML = '';

        let newContent = "To strengthen your candidacy, focus on gaining experience with real-time systems and high-traffic applications. Consider projects or coursework involving technologies like WebSockets, streaming data processing (e.g., Kafka, Apache Pulsar), and distributed systems architecture. Prioritize enhancing your proficiency in Python, Java, or Scala to better align with X's technology stack. Look for opportunities to showcase your expertise in building features for large-scale, user-facing platforms. Adding projects that demonstrate your understanding of scalability, fault tolerance, and real-time data handling will further enhance your application.";
// Create individual boxes for each key
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // Create a new div for each key-value pair
                const box = document.createElement("div");
                box.className = "response-box"; // Add a class for styling if needed

                // Set the content to display the key and value
                box.innerHTML = `<strong>${key}:</strong> ${data[key]}`;

                // Append each box to the responseBox
                responseBox.appendChild(box);
            }



        }
        const box = document.createElement("div");
        box.className = "response-box";
        summary = await generateSummary(newContent);
        box.innerHTML = `Summaraaaaay: ${summary}`;
        responseBox.appendChild(box);
        // Loop through JSON keys and display each key-value pair in a box if present
        // Object.keys(data).forEach(key => {
        //     if (data[key] !== null && data[key] !== undefined) { // Check if the value is present
        //         const box = document.createElement('div');
        //         box.className = 'box';
        //         box.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
        //         responseBox.appendChild(box);
        //     }
        // });
    } catch (error) {
        // Hide the spinner if an error occurs and show an error message
        spinner.style.display = 'none';
        response.textContent = 'An error occurred. Please try again later.';
        console.error("Error:", error);
    }
});


async function createSummarizer(config, downloadProgressCallback) {
    if (!window.ai || !window.ai.summarizer) {
        throw new Error('AI Summarization is not supported in this browser');
    }
    const canSummarize = await window.ai.summarizer.capabilities();
    if (canSummarize.available === 'no') {
        throw new Error('AI Summarization is not supported');
    }
    const summarizationSession = await self.ai.summarizer.create(
        config,
        downloadProgressCallback
    );
    if (canSummarize.available === 'after-download') {
        summarizationSession.addEventListener(
            'downloadprogress',
            downloadProgressCallback
        );
        await summarizationSession.ready;
    }
    return summarizationSession;
}

async function generateSummary(text) {
    try {
        const session = await createSummarizer(
            {
                type: "key-points",
                format: "markdown",
                length: "medium"
            },
            (message, progress) => {
                console.log(`${message} (${progress.loaded}/${progress.total})`);
            }
        );
        const summary = await session.summarize(text);
        console.log(summary);
        session.destroy();
        return summary;
    } catch (e) {
        console.log('Summary generation failed');
        console.error(e);
        return 'Error: ' + e.message;
    }
}
