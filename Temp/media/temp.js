import React, { useState } from "react";
import "./App.css";
import { generateSummary } from "./utils/api"; // Assuming generateSummary is an async function in your utils

function App() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [response, setResponse] = useState(null);
    const [summary, setSummary] = useState(""); // State to store the summary
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResumeChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleSubmit = async () => {
        if (!resume || !jobDescription) {
            alert("Please upload a resume and paste a job description.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await fetch("http://localhost:3005/api/evaluate", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response from the backend.");
            }

            const data = await response.json();
            setResponse(data);

            // Call generateSummary with the text
            const summaryText = await generateSummary("My name is Apoorv");
            setSummary(summaryText); // Store the summary in the state
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error communicating with the backend. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="App">
            <h1 className="title">Good Fit Evaluator</h1>

            <div className="container">
                {/* Resume Upload */}
                <div className="upload-section">
                    <label>Upload Resume:</label>
                    <input type="file" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
                </div>

                {/* Job Description Input */}
                <div className="upload-section">
                    <label>Paste Job Description:</label>
                    <textarea
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        placeholder="Paste the job description here..."
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="submit-section">
                    <button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>

                {/* Response Display */}
                {response && (
                    <div className="response-box">
                        <h2>Evaluation Result</h2>
                        <div className="result">
                            <div className="box isGoodFit">
                                <strong>isGoodFit:</strong> {response.isGoodFit ? "True" : "False"}
                            </div>
                            <div className="key-value-grid">
                                {Object.entries(response).map(([key, value]) =>
                                    key !== "isGoodFit" ? (
                                        <div className="box key-value-pair" key={key}>
                                            <strong>{key}:</strong> {value}
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                        {/* Summary Display */}
                        {summary && (
                            <div className="summary-box">
                                <h2>Summary</h2>
                                <p>{summary}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
