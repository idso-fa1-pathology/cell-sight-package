import os
from flask import Flask
from routes.predict import predict_bp

app = Flask(__name__, static_folder="../frontend", static_url_path="/")
app.register_blueprint(predict_bp, url_prefix='/api')

UPLOAD_FOLDER = 'backend/uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def serve_frontend():
    return app.send_static_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
