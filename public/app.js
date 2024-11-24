function addRowBox(key, value) {
    const keyRestWrapper = document.createElement('div');
    keyRestWrapper.className = 'keyWrapper';

    const rowBoxContainer = document.createElement('div');
    rowBoxContainer.className = 'key1Container';
    rowBoxContainer.textContent = key;

    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = value;


    keyRestWrapper.appendChild(rowBoxContainer);

    keyRestWrapper.appendChild(box);
    return keyRestWrapper;
}

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
let data;
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get required elements
    const spinner = document.getElementById('spinner');
    const gemini = document.querySelector('.gemini');
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
        data = await res.json();

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
                //
                // const keyWrapper = addRowBox(key,value);
                // boxContainer.appendChild(keyWrapper);
            } else {
                const keyRestWrapper = addColumnBox(key, value);
                keyRestTopContainer.appendChild(keyRestWrapper);
            }
        });
        // let newContent = "To strengthen your candidacy, focus on gaining experience with real-time systems and high-traffic applications. Consider projects or coursework involving technologies like WebSockets, streaming data processing (e.g., Kafka, Apache Pulsar), and distributed systems architecture. Prioritize enhancing your proficiency in Python, Java, or Scala to better align with X's technology stack. Look for opportunities to showcase your expertise in building features for large-scale, user-facing platforms. Adding projects that demonstrate your understanding of scalability, fault tolerance, and real-time data handling will further enhance your application.";
        // summary = await generateSummary(newContent);
        // const keyRestWrapper = addRowBox("key", summary);
        // boxContainer.appendChild(keyRestWrapper);
        //end of mansi's code

        // Append the box container to the main container
        gemini.appendChild(boxContainer);
        container.appendChild(gemini)

    } catch (error) {
        spinner.style.display = 'none';
        console.error("Error:", error);
        gemini.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
    tempF();



});

async function tempF(){
    const summary = document.querySelector('.summary');
    const container = document.querySelector('.container');
    const spinner = document.getElementById('spinner');
    // const container = document.querySelector('.container');
    let newContent = "To strengthen your candidacy, focus on gaining experience with real-time systems and high-traffic applications. Consider projects or coursework involving technologies like WebSockets, streaming data processing (e.g., Kafka, Apache Pulsar), and distributed systems architecture. Prioritize enhancing your proficiency in Python, Java, or Scala to better align with X's technology stack. Look for opportunities to showcase your expertise in building features for large-scale, user-facing platforms. Adding projects that demonstrate your understanding of scalability, fault tolerance, and real-time data handling will further enhance your application.";
    const summaryx = await generateSummary(newContent);
    const keyRestWrapper = addRowBox("key", summaryx);
    console.log("aaasss"+container.children.length);
    // const secondLastChild = container.children[container.children.length - 2];
    // // Remove the second last child
    // secondLastChild.remove();
    summary.appendChild(keyRestWrapper)
    container.appendChild(summary);
    const dropdownSection = document.getElementById('dropdownSection');
    dropdownSection.style.display = 'flex';
    spinner.style.display = 'none';
}

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

document.getElementById('regenerateButton').addEventListener('click', async () => {
    // Get selected dropdown values
    const dropdown1 = document.getElementById('dropdown1').value;
    const dropdown2 = document.getElementById('dropdown2').value;
    const dropdown3 = document.getElementById('dropdown3').value;
    const container = document.querySelector('.container');
    let newContent = "To strengthen your candidacy, focus on gaining experience with real-time systems and high-traffic applications. Consider projects or coursework involving technologies like WebSockets, streaming data processing (e.g., Kafka, Apache Pulsar), and distributed systems architecture. Prioritize enhancing your proficiency in Python, Java, or Scala to better align with X's technology stack. Look for opportunities to showcase your expertise in building features for large-scale, user-facing platforms. Adding projects that demonstrate your understanding of scalability, fault tolerance, and real-time data handling will further enhance your application.";
    const summary = await generateSummary(newContent);
    const keyRestWrapper = addRowBox("key", summary);
    console.log("aaasss"+container.children.length);
    const secondLastChild = container.children[container.children.length - 1];
    // Remove the second last child
    secondLastChild.remove();
    container.appendChild(keyRestWrapper);


    // Ensure at least one dropdown has a value
    // if (!dropdown1 && !dropdown2 && !dropdown3) {
    //     alert("Please select at least one option.");
    //     return;
    // }

    // spinner.style.display = 'block'; // Show spinner

    // try {
    //     // Call backend API for regenerating summary
    //     // const res = await fetch('/regenerate-summary', {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify({ dropdown1, dropdown2, dropdown3 }),
    //     // });
    //     // const data = await res.json();
    //     //
    //     // // Remove spinner and update the UI with the new summary
    //     // spinner.style.display = 'none';
    //
    //     // Dynamically display the new summary
    //     const summaryBox = addRowBox("Summary", "data.summary");
    //     // container.clear;
    //     summaryContainer.innerHTML(summaryBox);
    // } catch (error) {
    //     console.error("Error:", error);
    //     spinner.style.display = 'none';
    //     alert("Failed to regenerate summary. Please try again.");
    // }
});

