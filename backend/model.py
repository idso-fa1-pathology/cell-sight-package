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
