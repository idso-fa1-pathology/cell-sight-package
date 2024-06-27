from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from predict import run_inference

app = Flask(__name__, static_folder="../frontend", static_url_path="/")
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
            return jsonify({"error": "No file part"})

        files = request.files.getlist('images')
        for file in files:
            if file.filename == '':
                return jsonify({"error": "No selected file"})
            
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

        results = run_inference(app.config['UPLOAD_FOLDER'])
        
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
