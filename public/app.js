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
        // Simulating backend response
        const res = {
            json: async () => ({
                key1: "This is the expanded box content for key1",
                key2: "Value for key 2",
                key3: "Value for key 3",
                key4: "Value for key 4",
                key5: "Value for key 5",
                key6: "Value for key 6",
                key7: "Value for key 7",
                key8: "Value for key 8",
                key9: "Value for key 9",
                key10: "Value for key 10",
            }),
        };

        const data = await res.json();

        // Hide the spinner
        spinner.style.display = 'none';

        // Clear the existing container content
        container.innerHTML = '<h1>Backend Response</h1>';

        // Create a box container
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';

        // Add key-value pairs to the grid
        Object.entries(data).forEach(([key, value], index) => {
            const boxWrapper = document.createElement('div');
            boxWrapper.className = 'box-wrapper';

            // Add key label
            const keyLabel = document.createElement('div');
            keyLabel.className = 'key-label';
            keyLabel.textContent = key;

            // Create the box for the value
            const box = document.createElement('div');
            box.className = 'box';

            // Special case for key1 (spanning full width)
            if (index === 0) {
                box.classList.add('expanded');
                box.textContent = value;

                boxWrapper.appendChild(keyLabel);
                boxWrapper.appendChild(box);
                boxContainer.appendChild(boxWrapper);
            } else {
                box.textContent = value;

                // Add key label and value box to wrapper
                boxWrapper.appendChild(keyLabel);
                boxWrapper.appendChild(box);

                // Append to the container
                boxContainer.appendChild(boxWrapper);
            }
        });

        // Append the box container to the main container
        container.appendChild(boxContainer);
    } catch (error) {
        spinner.style.display = 'none';
        console.error("Error:", error);
        container.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
});
