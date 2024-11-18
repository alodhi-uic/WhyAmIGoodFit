document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    console.log("before index api called");
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    console.log("index api called");
    const result = await response.json();
    document.getElementById('response').textContent = JSON.stringify(result, null, 2);
});