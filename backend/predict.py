import os
import sys
import cv2
sys.path.append('src')
from model import load_model, download_weights
from utils import create_patches, save_patches, stitch_patches

def get_latest_predict_dir(base_dir):
    predict_dirs = [d for d in os.listdir(base_dir) if d.startswith('predict')]
    if not predict_dirs:
        return None
    latest_predict_dir = sorted(predict_dirs, key=lambda x: int(x.replace('predict', '') or '0'), reverse=True)[0]
    return os.path.join(base_dir, latest_predict_dir)

def predict_new_images(images_directory, weights_url, weights_path):
    try:
        print("Downloading weights...")
        os.makedirs(os.path.dirname(weights_path), exist_ok=True)
        download_weights(weights_url, weights_path)
        print("Weights downloaded")

        model = load_model(weights_path)
        results = []
        print("Model loaded")

        for file_name in os.listdir(images_directory):
            if file_name.endswith('.png') or file_name.endswith('.jpg'):
                image_path = os.path.join(images_directory, file_name)
                print(f"Processing image: {image_path}")
                image = cv2.imread(image_path)
                h, w = image.shape[:2]

                if h > 640 or w > 640:
                    print("Creating patches...")
                    patches = create_patches(image, patch_size=640, overlap=100)
                    patch_dir = os.path.join(images_directory, f"{file_name}_patches")
                    save_patches(patches, patch_dir)
                    print("Patches created and saved")

                    for patch, patch_name, _ in patches:
                        patch_path = os.path.join(patch_dir, patch_name)
                        model.predict(patch_path, save=True, imgsz=640, conf=0.5, max_det=3000, show_labels=False, save_txt=True, save_conf=True)
                        print(f"Predicted patch: {patch_path}")

                    latest_predict_dir = get_latest_predict_dir('runs/detect')
                    if latest_predict_dir:
                        label_dir = os.path.join(latest_predict_dir, 'labels')
                        predicted_patches = [(cv2.imread(os.path.join(patch_dir, patch_name)), patch_name, coords) for patch, patch_name, coords in patches]
                        stitched_image = stitch_patches(predicted_patches, (h, w), label_dir, patch_size=640, overlap=100)
                        output_path = os.path.join(images_directory, f"{file_name}_stitched.png")
                        cv2.imwrite(output_path, stitched_image)
                        results.append({"file_name": file_name, "output_path": output_path})
                        print(f"Stitched image saved: {output_path}")
                else:
                    model.predict(image_path, save=True, imgsz=640, conf=0.1, max_det=5000, show_labels=False, save_txt=True, save_conf=True)
                    results.append({"file_name": file_name, "output_path": image_path})
                    print(f"Image processed: {image_path}")

        print(f"Total images processed: {len(results)}")
        return results
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return []

if __name__ == '__main__':
    images_directory = 'data/predict/images/'
    weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'
    weights_path = 'runs/pretrained-model/weights/best.pt'
    
    predict_new_images(images_directory, weights_url, weights_path)
