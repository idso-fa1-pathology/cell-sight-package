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

### Data Format
Your dataset should be organized into three main folders: `train`, `test`, and `valid`. Each of these folders should contain two subfolders: `images` and `labels`.

- **images/**: Contains the image files.
- **labels/**: Contains the label files, where each label file corresponds to an image file with the same name but a `.txt` extension. The format of each line in the label file should be as follows:
    ```
    class_id center_x center_y width height
    ```
    - `class_id`: The class ID of the object.
    - `center_x`: The x-coordinate of the center of the bounding box, normalized to the [0, 1] range.
    - `center_y`: The y-coordinate of the center of the bounding box, normalized to the [0, 1] range.
    - `width`: The width of the bounding box, normalized to the [0, 1] range.
    - `height`: The height of the bounding box, normalized to the [0, 1] range.

    Example content of a label file:
    ```
    0 0.942446 0.0212446 0.0742872 0.0422503
    0 0.124674 0.327 0.0790858 0.078888
    0 0.527016 0.342674 0.0800738 0.0796084
    ```
    All input images should be resized to 640x640 pixels.

### Train the Model
1. Upload your training data to the `data/train/` directory, structured as described above.

2. Run the training script:
    ```bash
    python scripts/train_model.py
    ```

### Run Inference
1. Upload your test data (images) to the `data/test/` directory.

2. Run the inference script:
    ```bash
    python scripts/run_inference.py
    ```

3. The results will be saved in the `runs/` directory, with annotated images and prediction data.

## Project Structure
