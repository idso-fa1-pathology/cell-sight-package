from flask import Blueprint, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from predict import run_inference

predict_bp = Blueprint('predict_bp', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    try:
        if 'images' not in request.files:
            return jsonify({"error": "No file part"})

        files = request.files.getlist('images')
        file_paths = []
        for file in files:
            if file.filename == '':
                return jsonify({"error": "No selected file"})
            
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            file_paths.append(filepath)

        results = run_inference(file_paths)
        
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)})
