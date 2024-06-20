import os
import cv2
import numpy as np

colors = {
    '0': (0, 0, 255),     # Red
    '1': (255, 255, 0),   # Cyan
    '2': (255, 0, 255)    # Yellow
}

def create_patches(image, patch_size=640, overlap=0):
    patches = []
    h, w = image.shape[:2]
    step = patch_size - overlap

    for y in range(0, h, step):
        if y + patch_size > h:
            y = max(0, h - patch_size)
        for x in range(0, w, step):
            if x + patch_size > w:
                x = max(0, w - patch_size)
            patch = image[y:y + patch_size, x:x + patch_size]
            patch_name = f'patch_{y // step + 1}_{x // step + 1}.png'
            patches.append((patch, patch_name, (x, y)))
        if y + patch_size >= h:
            break
    return patches

def save_patches(patches, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    for patch, patch_name, _ in patches:
        patch_path = os.path.join(output_dir, patch_name)
        cv2.imwrite(patch_path, patch)

def read_labels(label_path):
    labels = []
    if os.path.exists(label_path):
        with open(label_path, 'r') as file:
            lines = file.readlines()
        for line in lines:
            values = line.strip().split(' ')
            if len(values) >= 5:  # Ensuring the line contains at least 5 values
                labels.append(values[:5])
    return labels

def annotate_patch(image, labels, patch_size=640):
    for label in labels:
        class_id, x_center, y_center, _, _ = map(float, label)
        x_center = int(x_center * patch_size)
        y_center = int(y_center * patch_size)
        color = colors.get(str(int(class_id)), (0, 0, 255))
        cv2.circle(image, (x_center, y_center), radius=4, color=color, thickness=-1)
    return image

def stitch_patches(patches, image_size, label_dir, patch_size=640, overlap=0):
    h, w = image_size
    stitched_image = np.zeros((h, w, 3), dtype=np.uint8)
    step = patch_size - overlap

    patches.sort(key=lambda x: (int(x[1].split('_')[1]), int(x[1].split('_')[2].split('.')[0])))

    for patch, patch_name, (x, y) in patches:
        label_path = os.path.join(label_dir, patch_name.replace('.png', '.txt'))
        labels = read_labels(label_path)
        if labels:
            patch = annotate_patch(patch, labels, patch_size)
        stitched_image[y:y + patch_size, x:x + patch_size] = patch[:patch_size, :patch_size]
    
    return stitched_image
