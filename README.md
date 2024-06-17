# Cell Detection Project

## Overview
This project uses YOLOv8 for cell detection in images. It provides scripts to train the model and run inference, with model weights hosted on Hugging Face.

## Setup

### Prerequisites
- Python 3.6 or higher
- pip

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cell_detection.git
    cd cell_detection
    ```

2. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Download the pre-trained model weights from [Hugging Face](https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true) (this will be done automatically when running the scripts).

## Usage

### Train the Model
1. Upload your training data to the `data/raw/` directory. Ensure your data is structured correctly, with images and annotations as required by YOLO.

2. Run the training script:
    ```bash
    python scripts/train_model.py
    ```

### Run Inference
1. Upload your test data (images) to the `data/raw/` directory.

2. Run the inference script:
    ```bash
    python scripts/run_inference.py
    ```

3. The results will be saved in the `runs/` directory, with annotated images and prediction data.

## Project Structure
