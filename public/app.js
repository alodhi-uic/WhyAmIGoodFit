document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show the spinner while waiting for the response
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('response').textContent = '';  // Clear any previous responses

    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        // Hide the spinner once the response is received
        document.getElementById('spinner').style.display = 'none';

        // Display the response in the box
        document.getElementById('response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        // Hide the spinner if an error occurs
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('response').textContent = 'An error occurred. Please try again later.';
    }
});
