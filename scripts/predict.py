import os
import sys
sys.path.append('src')
from model import load_model, download_weights

def predict_new_images(images_directory, weights_url, weights_path):
    # Ensure the weights directory exists
    os.makedirs(os.path.dirname(weights_path), exist_ok=True)
    download_weights(weights_url, weights_path)

    model = load_model(weights_path)
    counter = 0

    for file_name in os.listdir(images_directory):
        if file_name.endswith('.png') or file_name.endswith('.jpg'):
            source = os.path.join(images_directory, file_name)
            results = model.predict(source, save=True, imgsz=640, conf=0.5, max_det=3000, show_labels=False, save_txt=True, save_conf=True)
            counter += 1

    print(f'Total images processed: {counter}')

if __name__ == '__main__':
    images_directory = 'data/predict/images/'
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'
    weights_path = 'runs/pretrained-model/weights/best.pt'
    
    predict_new_images(images_directory, weights_url, weights_path)
