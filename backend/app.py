from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from predict import predict_new_images

app = Flask(__name__, static_folder="../frontend", static_url_path="")

UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'images' not in request.files:
            print("No file part in request")
            return jsonify({"error": "No file part"})

        files = request.files.getlist('images')
        for file in files:
            if file.filename == '':
                print("No selected file")
                return jsonify({"error": "No selected file"})
            
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            print(f"File saved to {filepath}")

        weights_url = 'https://huggingface.co/YasinShokrollahi/cell-detection/resolve/main/best.pt?download=true'
        weights_path = 'runs/pretrained-model/weights/best.pt'
        print(f"Starting prediction with weights from {weights_url}")
        results = predict_new_images(app.config['UPLOAD_FOLDER'], weights_url, weights_path)
        
        print(f"Prediction results: {results}")
        return jsonify({"results": results})
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)})

@app.route('/train', methods=['POST'])
def train():
    try:
        # Your training logic here
        print("Training started")
        return jsonify({"message": "Training done"})
    except Exception as e:
        print(f"Error during training: {str(e)}")
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
