document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered');

    // Log the entire document to verify the presence of the form elements
    console.log(document.body.innerHTML);

    const results = JSON.parse(localStorage.getItem('predictionResults'));
    console.log('Results from localStorage:', results);

    if (results && results.length > 0) {
        const canvas = document.getElementById('result-canvas');
        const context = canvas.getContext('2d');

        // Get the latest prediction result and corresponding image
        const latestResult = results[results.length - 1];
        console.log('Latest result:', latestResult);

        const originalImageSrc = `/uploads/${latestResult.file_name}`;

        // Use the image name for the prediction folder
        const fileNameWithoutExtension = latestResult.file_name.split('.')[0];
        console.log('File name without extension:', fileNameWithoutExtension);

        // Construct the labels path
        const labelsPath = `/uploads/${fileNameWithoutExtension}/labels/${latestResult.file_name.replace('.png', '.txt')}`;
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
                const labelsOutput = document.getElementById('labels-output');
                if (labelsOutput) {
                    labelsOutput.textContent = text;
                }

                // Parse annotation data
                const annotations = text.trim().split('\n').map(line => line.split(' ').map(Number));
                console.log('Parsed annotations:', annotations);

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

                    // Fetch user-defined colors with a slight delay to ensure the DOM is fully loaded
                    setTimeout(() => {
                        const colors = getUserDefinedColors();
                        console.log('Colors used for drawing:', colors);

                        // Draw the annotations as dots
                        annotations.forEach(([cls, x, y, width, height]) => {
                            const color = colors[cls];
                            const actualX = x * img.width;
                            const actualY = y * img.height;
                            context.fillStyle = color;
                            context.beginPath();
                            context.arc(actualX, actualY, 3, 0, 2 * Math.PI);
                            context.fill();
                        });

                        // Center the image within the container
                        const imageContainer = document.getElementById('image-container');
                        const canvasStyle = canvas.style;
                        canvasStyle.marginLeft = `${(imageContainer.clientWidth - canvas.width) / 2}px`;
                        canvasStyle.marginTop = `${(imageContainer.clientHeight - canvas.height) / 2}px`;
                    }, 100);  // 100ms delay
                };

                img.onerror = (error) => {
                    console.error('Error loading image:', error);
                };
            })
            .catch(error => console.error('Error fetching annotations:', error));
    } else {
        console.log('No results to display');
        document.getElementById('results-container').innerHTML = '<p>No results to display.</p>';
    }
});

function getUserDefinedColors() {
    const cd45ColorElement = document.getElementById('cd45-color');
    const panckColorElement = document.getElementById('panck-color');
    const cellsColorElement = document.getElementById('cells-color');

    console.log('cd45ColorElement:', cd45ColorElement);
    console.log('panckColorElement:', panckColorElement);
    console.log('cellsColorElement:', cellsColorElement);

    if (!cd45ColorElement || !panckColorElement || !cellsColorElement) {
        console.error('One or more color elements not found');
        return {
            '0': 'rgb(0, 0, 255)', // Default colors
            '1': 'rgb(255, 255, 0)',
            '2': 'rgb(255, 0, 255)'
        };
    }

    const cd45Color = cd45ColorElement.value;
    const panckColor = panckColorElement.value;
    const cellsColor = cellsColorElement.value;

    console.log('cd45Color:', cd45Color);
    console.log('panckColor:', panckColor);
    console.log('cellsColor:', cellsColor);

    return {
        '0': cd45Color,
        '1': panckColor,
        '2': cellsColor
    };
}
