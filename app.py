import os
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the trained model
model = load_model('model.h5')
print('Model loaded. Check http://127.0.0.1:5000/')

# Define labels
labels = {0: 'Healthy', 1: 'Powdery', 2: 'Rust'}

# Function to process image and get predictions
def getResult(image_path):
    img = load_img(image_path, target_size=(225, 225))
    x = img_to_array(img)
    x = x.astype('float32') / 255.
    x = np.expand_dims(x, axis=0)
    predictions = model.predict(x)[0]
    return predictions

@app.route('/predict', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    basepath = os.path.dirname(__file__)
    upload_folder = os.path.join(basepath, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, secure_filename(file.filename))
    file.save(file_path)

    # Get prediction
    predictions = getResult(file_path)
    predicted_label = labels[np.argmax(predictions)]
    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True)
