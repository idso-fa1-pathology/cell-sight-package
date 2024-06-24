import os
import sys

# Add the project root directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from model import run_inference

def main():
    print("Starting inference...")
    images_directory = 'data/predict/images/'
    weights_path = 'runs/trained/experiment/weights/best.pt'  # Path to your trained model weights
    run_inference(images_directory=images_directory, weights_path=weights_path)
    print("Inference completed.")

if __name__ == '__main__':
    main()
