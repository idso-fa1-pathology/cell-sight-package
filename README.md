# cell-detection-package

## Goal

The cell-detection-package is a Python package designed for detecting and segmenting cells in histology images. This package leverages deep learning models to provide accurate and efficient cell detection, facilitating research and analysis in pathology.

## Installation



First, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/idso-fa1-pathology/cell-sight-package.git
cd cell-sight-package
pip install -r requirements.txt
```



## Usage

### Predict New Images
To predict new images using the pre-trained model, follow these steps:

Download Pre-trained Model:

The pre-trained model weights will be automatically downloaded and saved in the runs/pretrained-model/weights directory when you run the prediction script.


1. Upload your images to the `data/predict/images/` directory.

2. Run the prediction script with the following command:
    ```bash
    python scripts/predict.py --images_directory data/predict/images/ --output_directory runs/predict/
    ```

3. The results will be saved in the specified `output_directory`, with annotated images and prediction data.

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



  
## Running with Docker

To run the `cell-sight-package` Docker image, follow these steps:

1. **Pull the Docker image**:

   ```bash
   docker pull yshokrolllahi/cell-sight-package:latest
   ```

2. **Run the Docker container**:

   ```bash
   docker run -it --rm yshokrolllahi/cell-sight-package:latest
   ```

This will start the container and run your application as defined in the Dockerfile.

## From GitHub Packages

1. **Pull the Docker image**:

   ```bash
    docker pull ghcr.io/idso-fa1-pathology/cell-sight-package:latest
   ```

2. **Run the Docker container:**:


   ```bash
    docker run -it --rm ghcr.io/idso-fa1-pathology/cell-sight-package:latest
   ```


This will start the container and run your application as defined in the Dockerfile.


