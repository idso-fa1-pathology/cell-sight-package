from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="../frontend", static_url_path="")

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')

@app.route('/predict', methods=['POST'])
def predict():
    # Your prediction logic here
    return jsonify({"message": "Prediction done"})

@app.route('/train', methods=['POST'])
def train():
    # Your training logic here
    return jsonify({"message": "Training done"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
