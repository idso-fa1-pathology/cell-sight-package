import os
from flask import Flask, send_from_directory, abort
from routes.predict import predict_bp

app = Flask(__name__, static_folder="../frontend", static_url_path="/")
app.register_blueprint(predict_bp, url_prefix='/api')

# Define the upload folder path correctly
UPLOAD_FOLDER = os.path.join(app.root_path, '..', 'backend', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route to serve the frontend index.html
@app.route('/')
def serve_frontend():
    return app.send_static_file('index.html')

# Route to serve the favicon
@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

# Route to serve uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    # Construct the full file path
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    else:
        abort(404, description="Resource not found")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
