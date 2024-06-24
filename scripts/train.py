import os
import sys
import argparse
sys.path.append('src')
from model import train_model

def main():
    parser = argparse.ArgumentParser(description="Train YOLOv8 model.")
    parser.add_argument('--config_path', type=str, default='data/raw/config.yaml', help='Path to the config file.')
    args = parser.parse_args()

    config_path = args.config_path

    print("Starting model training script...")
    train_model(config_path=config_path)
    print("Model training script completed.")

if __name__ == '__main__':
    main()
