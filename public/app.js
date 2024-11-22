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

        // const data = await res.json();
        const data = {
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
        }
        // Hide the spinner
        spinner.style.display = 'none';

        // Clear the existing container content
        container.innerHTML = '<h1>Backend Response</h1>';

        //mansi's code
        const boxContainer = document.createElement('div');
        boxContainer.className = 'box-container';
        console.log(data, "data");
        
        
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
            if (index === 0) {
                key1Container.textContent = key;
                box1.textContent = value;
            } else {
               
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
                keyRestTopContainer.appendChild(keyRestWrapper);
            }
        });
        
        //end of mansi's code

        // Append the box container to the main container
        container.appendChild(boxContainer);
    } catch (error) {
        spinner.style.display = 'none';
        console.error("Error:", error);
        container.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
});
