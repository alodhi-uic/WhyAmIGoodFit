function addColumnBox(key, value) {
    const keyRestWrapper = document.createElement('div');
    keyRestWrapper.className = 'keyWrapper';

    const keyRestContainer = document.createElement('div');
    keyRestContainer.className = 'keyRestContainer';
    keyRestContainer.textContent = key;

    const box2 = document.createElement('div');
    box2.className = 'box';
    box2.textContent = value;

    keyRestWrapper.appendChild(keyRestContainer);
    keyRestWrapper.appendChild(box2);
    return keyRestWrapper;
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get required elements
    const spinner = document.getElementById('spinner');
    const container = document.querySelector('.container');

    // Show the spinner while waiting for the response
    spinner.style.display = 'block';


    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("jobDescription", document.getElementById("jobDescription").value);

    try {
        const res = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        //mansi's code
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';
        // console.log(data, "data");


        const key1Container = document.createElement('div');
        key1Container.className = 'key1Container';

        const box1 = document.createElement('div');
        box1.className = 'box';

        const key1Wrapper = document.createElement('div');
        key1Wrapper.className = 'keyWrapper';
        key1Wrapper.appendChild(key1Container);
        key1Wrapper.appendChild(box1);
        boxContainer.appendChild(key1Wrapper);


        const keyRestTopContainer = document.createElement('div');
        keyRestTopContainer.className = 'keyRestTopContainer';
        boxContainer.appendChild(keyRestTopContainer);

        Object.entries(data).forEach(([key, value], index) => {
            if (key === "isGoodFit") {
                key1Container.textContent = key;
                box1.textContent = value;
            } else {

                const keyRestWrapper = addColumnBox(key, value);
                keyRestTopContainer.appendChild(keyRestWrapper);
            }
        });
        let newContent = "To strengthen your candidacy, focus on gaining experience with real-time systems and high-traffic applications. Consider projects or coursework involving technologies like WebSockets, streaming data processing (e.g., Kafka, Apache Pulsar), and distributed systems architecture. Prioritize enhancing your proficiency in Python, Java, or Scala to better align with X's technology stack. Look for opportunities to showcase your expertise in building features for large-scale, user-facing platforms. Adding projects that demonstrate your understanding of scalability, fault tolerance, and real-time data handling will further enhance your application.";
        summary = await generateSummary(newContent);
        const keyRestWrapper = addColumnBox("key", summary);
        keyRestTopContainer.appendChild(keyRestWrapper);
        //end of mansi's code

        // Append the box container to the main container
        container.appendChild(boxContainer);

    } catch (error) {
        spinner.style.display = 'none';
        console.error("Error:", error);
        container.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }

    spinner.style.display = 'none';
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
