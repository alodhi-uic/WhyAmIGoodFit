document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show the spinner while waiting for the response
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('response').textContent = {};
        // .textContent = '';  // Clear any previous responses

    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    formData.append("jobDescription", document.getElementById("jobDescription").value);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        // Hide the spinner once the response is received
        document.getElementById('spinner').style.display = 'none';

        // Display the response in the box
        // document.getElementById('response').textContent = result.get("goodFit")


        // const data = {
        //     name: "John Doe",
        //     age: 30,
        //     email: "john.doe@example.com",
        //     address: null
        // };

        // Clear any previous response
        const responseBox = document.getElementById('responseBox');
        responseBox.innerHTML = '';

        // Loop through JSON keys and display each key-value pair in a box if present
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) { // Check if the value is present
                const box = document.createElement('div');
                box.className = 'box';
                box.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
                responseBox.appendChild(box);
            }
        });
    } catch (error) {
        // Hide the spinner if an error occurs
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('response').textContent = 'An error occurred. Please try again later.';
    }
});
