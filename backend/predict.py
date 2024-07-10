import os
from utils.download import load_model, download_weights

def run_inference(file_paths, weights_path='backend/models/weights/best.pt'):
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'

    # Ensure the weights directory exists
    os.makedirs(os.path.dirname(weights_path), exist_ok=True)
    download_weights(weights_url, weights_path)

    model = load_model(weights_path)
    results = []

    # Directory to save the predictions
    save_dir = os.path.join('backend', 'uploads')
    os.makedirs(save_dir, exist_ok=True)

    for file_path in file_paths:
        file_name = os.path.basename(file_path).split('.')[0]
        prediction_results = model.predict(source=file_path, save=True, imgsz=640, max_det=3000, conf=0.8, show_labels=False, save_txt=True, project=save_dir, name=file_name)

        # Collect output paths from each result
        for result in prediction_results:
            output_path = os.path.join(save_dir, file_name, os.path.basename(result.path))
            results.append({
                "file_name": os.path.basename(file_path),
                "output_path": output_path
            })

    return results
