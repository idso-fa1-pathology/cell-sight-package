document.getElementById('images').addEventListener('change', function(event) {
    const files = event.target.files;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = ''; // Clear previous preview
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
    document.getElementById('predict-button').style.display = 'block';
});

document.getElementById('predict-button').addEventListener('click', function() {
    const formData = new FormData();
    const files = document.getElementById('images').files;
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }
    formData.append('model-name', document.getElementById('model-name').value);
    formData.append('confidence-rate', document.getElementById('confidence-rate').value);
    formData.append('annotation-shape', document.getElementById('annotation-shape').value);
    formData.append('cells-color', document.getElementById('cells-color').value);
    formData.append('cd45-color', document.getElementById('cd45-color').value);
    formData.append('panck-color', document.getElementById('panck-color').value);

    document.getElementById('loading-bar').style.display = 'block'; // Show loading bar

    fetch('/api/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading-bar').style.display = 'none'; // Hide loading bar
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            // Assuming you want to redirect to the results page
            window.location.href = 'results.html';
        }
    })
    .catch((error) => {
        document.getElementById('loading-bar').style.display = 'none'; // Hide loading bar
        console.error('Error:', error);
    });
});
