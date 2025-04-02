from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import re
import pickle
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Load the trained model and vectorizer
def load_model():
    # Check if model and vectorizer exist, otherwise create them
    if os.path.exists('lr_model.pkl') and os.path.exists('vectorizer.pkl') and os.path.exists('label_encoder.pkl'):
        with open('lr_model.pkl', 'rb') as f:
            lr_model = pickle.load(f)
        with open('vectorizer.pkl', 'rb') as f:
            vectorizer = pickle.load(f)
        with open('label_encoder.pkl', 'rb') as f:
            label_encoder = pickle.load(f)
        return lr_model, vectorizer, label_encoder
    else:
        # You should run your model training script first
        raise FileNotFoundError("Model files not found. Please train the model first.")

# Define preprocessing function (same as in your notebook)
def preprocess_text(text):
    if isinstance(text, str):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        return text
    return ""

# Try to load the model at startup
try:
    lr_model, vectorizer, label_encoder = load_model()
    model_loaded = True
except FileNotFoundError:
    print("Warning: Model files not found. Please train and save your model first.")
    model_loaded = False

@app.route('/')
def index():
    return render_template('index.html', model_loaded=model_loaded)

# New route for team page
@app.route('/team')
def team():
    return render_template('team.html', model_loaded=model_loaded)

# New route for about page
@app.route('/about')
def about():
    return render_template('about.html', model_loaded=model_loaded)

@app.route('/predict', methods=['POST'])
def predict():
    if not model_loaded:
        return jsonify({
            'error': 'Model not loaded. Please train the model first.'
        }), 500
    
    data = request.get_json()
    
    if 'text' not in data:
        return jsonify({
            'error': 'No text provided'
        }), 400
    
    # Preprocess the input text
    text = data['text']
    preprocessed_text = preprocess_text(text)
    
    # Vectorize the preprocessed text
    text_vectorized = vectorizer.transform([preprocessed_text])
    
    # Make prediction
    prediction = lr_model.predict(text_vectorized)[0]
    prediction_proba = lr_model.predict_proba(text_vectorized)[0]
    
    # Get the class label
    predicted_class = label_encoder.inverse_transform([prediction])[0]
    
    # Get the probabilities for each class
    class_probabilities = {}
    for i, label in enumerate(label_encoder.classes_):
        class_probabilities[label] = float(prediction_proba[i])
    
    return jsonify({
        'prediction': predicted_class,
        'confidence': float(prediction_proba.max()),
        'probabilities': class_probabilities
    })

@app.route('/save_model', methods=['POST'])
def save_model_endpoint():
    """Endpoint to save the model from your notebook."""
    data = request.get_json()
    
    try:
        # This would typically be done in your notebook or a separate script
        # Just providing the API endpoint here
        return jsonify({'success': 'Model saved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model_info', methods=['GET'])
def model_info():
    if not model_loaded:
        return jsonify({
            'error': 'Model not loaded'
        }), 500
    
    # Get model information
    classes = label_encoder.classes_.tolist()
    vocabulary_size = len(vectorizer.get_feature_names_out())
    
    return jsonify({
        'vocabulary_size': vocabulary_size,
        'classes': classes,
        'model_type': 'Logistic Regression'
    })

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    if not model_loaded:
        return jsonify({
            'error': 'Model not loaded. Please train the model first.'
        }), 500
    
    data = request.get_json()
    
    if 'texts' not in data or not isinstance(data['texts'], list):
        return jsonify({
            'error': 'No texts provided or invalid format'
        }), 400
    
    results = []
    for text in data['texts']:
        # Preprocess the input text
        preprocessed_text = preprocess_text(text)
        
        # Vectorize the preprocessed text
        text_vectorized = vectorizer.transform([preprocessed_text])
        
        # Make prediction
        prediction = lr_model.predict(text_vectorized)[0]
        confidence = float(lr_model.predict_proba(text_vectorized)[0].max())
        
        # Get the class label
        predicted_class = label_encoder.inverse_transform([prediction])[0]
        
        results.append({
            'text': text,
            'prediction': predicted_class,
            'confidence': confidence
        })
    
    return jsonify({
        'results': results
    })

if __name__ == '__main__':
    app.run(debug=True)