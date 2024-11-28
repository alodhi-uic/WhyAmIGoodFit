let data;
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs';

// const jobDescription = document.querySelector('#jobDescription').value;
//
// document.getElementById('jobDescriptionSubmitButton').addEventListener('onClick', async (e) => {
//     e.preventDefault();
//     const jobDescription = document.getElementById('jobDescription').value;
// console.log("jobDescription added");
//     // Simulate calling an external function
//     const summary = await generateSummary(jobDescription);
//
//     const outputBox = document.getElementById('output');
//     outputBox.textContent = summary;
//
// });

// const session = await ai.languageModel.create({
//     systemPrompt: "You are a friendly, helpful assistant specialized technical writing."
// });
//
// const stream = await session.promptStreaming("Can you rewrite this in a more formal language. Make it shorter too. I am a strong fit for this software engineering internship because my skills and experience align well with the requirements. My projects in sentiment analysis, social media application development, and e-commerce platform creation demonstrate my ability to build full-stack applications, handle large datasets, and design scalable systems. My experience with cloud technologies like AWS and Google Cloud, along with my proficiency in Java, Python, and other programming languages, will enable me to quickly adapt to your team's workflow and contribute meaningfully. Furthermore, my internships at CARS24 and OLA Electric honed my skills in improving system efficiency, enhancing user experience, and streamlining operations, which are directly relevant to creating an effective real-time information sharing platform. I'm eager to learn and contribute to a challenging and innovative environment like X");
//
//
// // console.log("result" + result.toString());
// // const stream = await session.promptStreaming("Write me an extra-long poem.");
// for await (const chunk of stream) {
//     console.log(chunk);
// }
//
// const result2 = await session.prompt(`
//   That sounds great, but oh no, I forgot to add that I am also skilled in product management and that will be a good skill for the role.
// `);
// console.log("result22" + result2);


const spinnerGlobal = document.getElementById('spinner');
const dropdownSection = document.getElementById('dropdownSection');
const jobDescription = document.querySelector('#jobDescription');
const jdUploadButton = document.getElementById('jdUploadButton');
const outputBox = document.getElementById('output');
const resumeUploadForm = document.getElementById('resumeUploadForm');
const promptSummary = document.getElementById('prompt-summary');


const rewriteForm = document.getElementById('rewriteForm');

const reWriteFormToneSelect = document.querySelector('#rewrite-tone') ;
const reWriteFormFormatSelect = document.querySelector('#rewrite-format');
const reWriteFormLengthSelect = document.querySelector('#rewrite-length');
const reWriteFormPrompt = document.querySelector('#prompt');
const session = await ai.languageModel.create({
    systemPrompt: `You are a friendly, helpful assistant specialized technical writing.  Rewrite tone should be ${reWriteFormToneSelect.value}, format should be ${reWriteFormFormatSelect.value} and length should be ${reWriteFormLengthSelect.value}`
});
document.getElementById('rewriteFormButton').addEventListener('click', async (event) => {
    // spinnerGlobal.style.display = 'block';
    event.preventDefault()
    let originalQnswer = promptSummary.textContent ? promptSummary.textContent:data.tellMeWhyHireYou;
    console.log("originalQnswer:::" + originalQnswer);
let fullPrompt = `Can you rewrite this. ${originalQnswer}. Can you also include these details that i forgot to add in my resume too:${reWriteFormPrompt.value}.`;
    // console.log("fullPrompt:::" + fullPrompt);
    const stream = await session.promptStreaming(fullPrompt);

    promptSummary.textContent = '';
    let fullResponse = '';
    for await (const chunk of stream) {
        fullResponse = chunk.trim();
        promptSummary.innerHTML = DOMPurify.sanitize(
            fullResponse /*marked.parse(fullResponse)*/
        );
    }

    console.log(session);
// console.log("result" + result.toString());
// const stream = await session.promptStreaming("Write me an extra-long poem.");
//     for await (const chunk of stream) {
//         console.log(chunk);
//     }
//     outputBox.textContent = summary;
//     const result2 = await session.prompt(`
//   That sounds great, but oh no, I forgot to add that I am also skilled in product management and that will be a good skill for the role.
// `);
//     console.log("result22" + result2);

});

// async function jobDescriptionSummarizer(){
//     console.log("JDS called");
//     const jobDescriptionInput = document.getElementById('jobDescription');
//     const outputBox = document.getElementById('output');
//
//
//     // const summary = document.querySelector('.summary');
//     // const container = document.querySelector('.container');
//     // const spinner = document.getElementById('spinner');
//     // let newContent = jobDescription.value;
//     const content = await generateSummary(jobDescriptionInput);
//     // const keyRestWrapper = addRowBox("key", summaryx);
//     // console.log("aaasss"+container.children.length);
//
//     // summary.appendChild(keyRestWrapper)
//     // container.appendChild(summary);
//     // const dropdownSection = document.getElementById('dropdownSection');
//     // dropdownSection.style.display = 'flex';
//     // spinner.style.display = 'none';
//     outputBox.textContent = content;
//     // output.style.display = 'block';
//     //
//     // let fullResponse = summaryx;
//     // output.innerHTML = `${fullResponse}`;
//
// }




// let rewriter;
// const rewriteFormatSelect = document.querySelector('.rewrite-format');
// const rewriteToneSelect = document.querySelector('.rewrite-tone');
// const rewriteLengthSelect = document.querySelector('.rewrite-length');
// const output = document.querySelector('output');
// const contextInput = document.querySelector('input');
// const createRewriter = async () => {
//     rewriter = await self.ai.rewriter.create({
//         tone: rewriteToneSelect.value,
//         length: rewriteLengthSelect.value,
//         format: rewriteFormatSelect.value,
//     });
//     console.log(rewriter);
// };
// (async ()=>{
//
//
//     [rewriteToneSelect, rewriteFormatSelect, rewriteLengthSelect].forEach(
//         (select) => {
//             select.addEventListener('change', async () => {
//                 await createRewriter();
//             });
//         }
//     );
//
//
//
//
//     // const result = await rewriter.rewrite(reviewEl.textContent, {
//     //     const prompt = output.innerHTML.trim();
//     //     context: "Avoid any toxic language and be as constructive as possible."
//     // });
//
//
// })();
// // const rewriteFormatSelect = document.querySelector('.rewrite-format');
// // const rewriteToneSelect = document.querySelector('.rewrite-tone');
// // const rewriteLengthSelect = document.querySelector('.rewrite-length');
// const rewriteForm = document.querySelector('.rewrite-form');
// rewriteForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     await rewrite();
// });
// const rewrite = async () => {
// console.log("Reqqqqq");
//     const prompt = "To strengthen your candidacy, focus on gaining experience with real-time systems, high-traffic applications, and technologies like WebSockets and distributed systems architecture.";
//     if (!prompt) {
//         return;
//     }
//     console.log("prompt:::" + prompt);
//     output.textContent = 'Rewriting…';
//     setTimeout(() => {
//         console.log('After 2 seconds delay');
//     }, 10000);
//     let stream = await rewriter.rewrite(prompt);
//     output.textContent = '';
//     console.log("Stresa:::" + stream);
//     // const stream = await rewriter.rewriteStreaming(prompt);
//     // output.textContent = '';
//     // let fullResponse = '';
//     // for await (const chunk of stream) {
//     //     fullResponse = chunk.trim();
//     //     output.innerHTML = DOMPurify.sanitize(fullResponse);
//     // }
//     // rewriteForm.hidden = false;
//     //
//     // [rewriteToneSelect, rewriteLengthSelect, rewriteFormatSelect].forEach(
//     //     (select) => (select.value = 'as-is')
//     // );
// };




(async()=>{


//     const session = await ai.languageModel.create({
//         systemPrompt: "You are a friendly, helpful assistant specialized technical writing."
//     });
//
//     const stream = await session.promptStreaming("Can you rewrite this in a more formal language. Make it shorter too. I am a strong fit for this software engineering internship because my skills and experience align well with the requirements. My projects in sentiment analysis, social media application development, and e-commerce platform creation demonstrate my ability to build full-stack applications, handle large datasets, and design scalable systems. My experience with cloud technologies like AWS and Google Cloud, along with my proficiency in Java, Python, and other programming languages, will enable me to quickly adapt to your team's workflow and contribute meaningfully. Furthermore, my internships at CARS24 and OLA Electric honed my skills in improving system efficiency, enhancing user experience, and streamlining operations, which are directly relevant to creating an effective real-time information sharing platform. I'm eager to learn and contribute to a challenging and innovative environment like X");
//
//
//     // console.log("result" + result.toString());
//     // const stream = await session.promptStreaming("Write me an extra-long poem.");
//     for await (const chunk of stream) {
//         console.log(chunk);
//     }
//
//     const result2 = await session.prompt(`
//   That sounds great, but oh no, I forgot to add that I am also skilled in product management and that will be a good skill for the role.
// `);
//     console.log("result22" + result2);

    // outputBox.textContent = summary;
})();

/*****************************************************************************/
/*************************SUMMARIZE Job Description***************************/
/*****************************************************************************/

document.getElementById('jobForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    spinnerGlobal.style.display = 'block';
    console.log("job description added for summerization");
    // Simulate calling an external function
    outputBox.textContent = await generateSummary(jobDescription.value);
    jdUploadButton.style.display = 'none';
    dropdownSection.style.display = 'block';
    spinnerGlobal.style.display = 'none';
    resumeUploadForm.style.display = 'block';
});

document.getElementById('regenerateButton').addEventListener('click', async () => {
    spinnerGlobal.style.display = 'block';
    console.log("job description uploaded for regeneration");
    // console.log("JJDDD:" + jobDescription.value);
    outputBox.textContent = await generateSummary(jobDescription.value);
    dropdownSection.style.display = 'block';
    resumeUploadForm.style.display = 'block';
    spinnerGlobal.style.display = 'none';
});

/*****************************************************************************/
/*****************************SUMMARIZER**************************************/
/*****************************************************************************/

const summaryTypeSelect = document.querySelector('#type') ;
const summaryFormatSelect = document.querySelector('#format');
const summaryLengthSelect = document.querySelector('#length');

async function generateSummary(text) {
    try {
        const session = await createSummarizer(
            {
                type: summaryTypeSelect.value,
                format: summaryFormatSelect.value,
                length: summaryLengthSelect.value,
                sharedContext: "This is a job description for a software engineering role. Also include the details mentioned about the company in the summary. Like company name and its values, ambitions",
            },
            (message, progress) => {
                console.log(`${message} (${progress.loaded}/${progress.total})`);
            }
        );
        console.log("summaryTypeSelect:" + summaryTypeSelect.value +", summaryFormatSelect:"+ summaryFormatSelect.value+", summaryLengthSelect:" + summaryLengthSelect.value);
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

/*****************************************************************************/
/***********************Response from Backend*********************************/
/*****************************************************************************/

document.getElementById('resumeUploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get required elements
    const gemini = document.querySelector('.gemini');
    const container = document.querySelector('.container');

    // Show the spinner while waiting for the response
    spinner.style.display = 'block';


    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("jobDescription", jobDescription.value);

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
            } else if(key !== "tellMeWhyHireYou") {
                const keyRestWrapper = addRowBox(key, value);
                keyRestTopContainer.appendChild(keyRestWrapper);
            }
        });
        // Append the box container to the main container
        gemini.appendChild(boxContainer);
        // container.appendChild(gemini)

    } catch (error) {
        spinner.style.display = 'none';
        console.error("Error:", error);
        gemini.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
    spinner.style.display = 'none';
    let tellMeWhyHireYouFromGemini = data.tellMeWhyHireYou;
    whyHire(tellMeWhyHireYouFromGemini);

});

async function whyHire(tellMeWhyHireYouFromGemini){
    const promptSummary = document.querySelector('.prompt-summary');
    // console.log("jdbvkjdz:::"+data.tellMeWhyHireYou);
    const boxContainer = document.createElement('div');
    boxContainer.className = 'box-container';
    const key1Container = document.createElement('div');
    key1Container.className = 'key1Container';

    const box1 = document.createElement('div');
    box1.className = 'box';

    const key1Wrapper = document.createElement('div');
    key1Wrapper.className = 'keyWrapper';
    key1Wrapper.appendChild(key1Container);
    key1Wrapper.appendChild(box1);
    key1Container.textContent = "tellMeWhyHireYou";
    box1.textContent = tellMeWhyHireYouFromGemini;
    boxContainer.appendChild(key1Wrapper);
    promptSummary.appendChild(boxContainer);

    rewriteForm.style.display = 'block';

}

/*****************************************************************************/
/************************Generate output Divs***********************************/
/*****************************************************************************/

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