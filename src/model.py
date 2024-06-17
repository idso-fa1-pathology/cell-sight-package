import os
import requests
from ultralytics import YOLO

def download_weights(url, output_path):
    if not os.path.exists(output_path):
        response = requests.get(url, stream=True)
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f'Weights downloaded to {output_path}')
    else:
        print('Weights already downloaded.')

def load_model(model_path):
    return YOLO(model_path)

def train_model(config_path):
    os.system(f'yolo train model=yolov8x.pt data={config_path} epochs=50 imgsz=640')

def run_inference(images_directory):
    weights_path = 'runs/dataset-val-2000/weights/best.pt'
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'

    # Ensure the weights directory exists
    os.makedirs(os.path.dirname(weights_path), exist_ok=True)
    download_weights(weights_url, weights_path)

    model = load_model(weights_path)
    counter = 0

    for file_name in os.listdir(images_directory):
        if file_name.endswith('.png'):
            source = os.path.join(images_directory, file_name)
            results = model.predict(source, save=True, imgsz=640, conf=0.5, max_det=3000, show_labels=False, save_txt=True, save_conf=True)
            counter += 1

    print(f'Total images processed: {counter}')
