import os
from ultralytics import YOLO

def load_model(model_path):
    return YOLO(model_path)

def train_model(config_path):
    os.system(f'yolo train model=yolov8x.pt data={config_path} epochs=50 imgsz=640')

def run_inference(images_directory):
    model = load_model('runs/dataset-val-2000/weights/best.pt')
    counter = 0

    for file_name in os.listdir(images_directory):
        if file_name.endswith('.png'):
            source = os.path.join(images_directory, file_name)
            results = model.predict(source, save=True, imgsz=640, conf=0.5, max_det=3000, show_labels=False, save_txt=True, save_conf=True)
            counter += 1

    print(f'Total images processed: {counter}')
