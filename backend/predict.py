import os
from model import load_model, download_weights

def run_inference(images_directory, weights_path='backend/models/weights/best.pt'):
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'

    # Ensure the weights directory exists
    os.makedirs(os.path.dirname(weights_path), exist_ok=True)
    download_weights(weights_url, weights_path)

    model = load_model(weights_path)
    results = []

    # Directory to save the predictions
    save_dir = os.path.join(images_directory, 'runs')
    os.makedirs(save_dir, exist_ok=True)

    for file_name in os.listdir(images_directory):
        if file_name.endswith('.png') or file_name.endswith('.jpg'):
            source = os.path.join(images_directory, file_name)
            prediction_results = model.predict(source, save=True, save_dir=save_dir, imgsz=640, conf=0.5, max_det=3000, show_labels=False, save_txt=True, save_conf=True)
            
            # Collect output paths from each result
            for result in prediction_results:
                output_path = os.path.join(save_dir, os.path.basename(result.path))
                results.append({
                    "file_name": file_name,
                    "output_path": output_path
                })

    return results
