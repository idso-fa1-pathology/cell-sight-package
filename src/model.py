import os
import yaml
import requests
from ultralytics import YOLO

def set_yolo_datasets_path(config_path):
    config_dir = os.path.dirname(config_path)
    yolo_datasets_path = os.path.abspath(config_dir)
    os.environ['YOLO_DATASETS_PATH'] = yolo_datasets_path
    print(f"YOLO_DATASETS_PATH set to: {yolo_datasets_path}")

def read_config(config_path):
    with open(config_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def update_config_paths(config, config_dir):
    config['path'] = os.path.abspath(config_dir)
    config['train'] = os.path.join(config_dir, config['train'])
    config['val'] = os.path.join(config_dir, config['val'])
    config['test'] = os.path.join(config_dir, config['test'])
    return config

def write_config(config, config_path):
    with open(config_path, 'w') as file:
        yaml.safe_dump(config, file)

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

def train_model(config_path, model_path='yolov8x.pt', epochs=50, imgsz=640, patience=500, output_dir='runs/trained'):
    set_yolo_datasets_path(config_path)
    
    os.makedirs(output_dir, exist_ok=True)
    print(f"Training with config file: {config_path}")

    # Read and update config paths
    config = read_config(config_path)
    config_dir = os.path.abspath(os.path.dirname(config_path))
    config = update_config_paths(config, config_dir)
    temp_config_path = os.path.join(config_dir, 'temp_config.yaml')
    write_config(config, temp_config_path)

    # Debugging statements to check the existence of directories
    print(f"Contents of {config_dir}: {os.listdir(config_dir)}")
    train_images_dir = config['train']
    val_images_dir = config['val']
    print(f"Contents of {train_images_dir}: {os.listdir(train_images_dir)}")
    print(f"Contents of {val_images_dir}: {os.listdir(val_images_dir)}")
    
    # Replace invalid characters in project name
    valid_project_name = output_dir.replace('/', '_')
    
    command = f'yolo train model={model_path} data={temp_config_path} epochs={epochs} imgsz={imgsz} patience={patience} project={valid_project_name} name=experiment'
    print(f"Executing command: {command}")
    os.system(command)
    
    # Cleanup temporary config file
    os.remove(temp_config_path)

def run_inference(images_directory, weights_path='runs/trained/experiment/weights/best.pt'):
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'

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
