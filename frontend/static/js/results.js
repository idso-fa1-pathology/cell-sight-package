document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered');

    const results = JSON.parse(localStorage.getItem('predictionResults'));
    console.log('Results from localStorage:', results);

    if (results && results.length > 0) {
        const canvas = document.getElementById('result-canvas');
        const context = canvas.getContext('2d');

        // Get the latest prediction result and corresponding image
        const latestResult = results[results.length - 1];
        console.log('Latest result:', latestResult);

        const originalImageSrc = `/uploads/${latestResult.file_name}`;
        
        // Extract the correct prediction folder part
        const outputPathParts = latestResult.output_path.split('/');
        console.log('Output path parts:', outputPathParts);

        // Find the prediction folder index dynamically
        let predictFolderIndex = null;
        for (let i = outputPathParts.length - 1; i >= 0; i--) {
            if (outputPathParts[i].startsWith('predict')) {
                predictFolderIndex = i;
                break;
            }
        }

        if (predictFolderIndex !== null) {
            const predictionFolder = outputPathParts[predictFolderIndex];
            const labelsPath = `/uploads/runs/${predictionFolder}/labels/${outputPathParts[outputPathParts.length - 1].replace('.png', '.txt')}`;
            console.log('Labels path:', labelsPath);

            // Fetch and display the annotations
            fetch(labelsPath)
                .then(response => {
                    console.log('Fetch response:', response);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    console.log('Annotations text:', text);
                    // Process your label data here
                })
                .catch(error => console.error('Error fetching annotations:', error));
        } else {
            console.error('Could not find prediction folder index in output path.');
        }

        // Load and display the original image
        const img = new Image();
        img.src = originalImageSrc;
        console.log('Image object created:', img);

        img.onload = () => {
            console.log('Image loaded successfully');

            // Set canvas size to match the image
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            // Center the image within the container
            const imageContainer = document.getElementById('image-container');
            const canvasStyle = canvas.style;
            canvasStyle.marginLeft = `${(imageContainer.clientWidth - canvas.width) / 2}px`;
            canvasStyle.marginTop = `${(imageContainer.clientHeight - canvas.height) / 2}px`;
        };

        img.onerror = (error) => {
            console.error('Error loading image:', error);
        };
    } else {
        console.log('No results to display');
        document.getElementById('results-container').innerHTML = '<p>No results to display.</p>';
    }
});
