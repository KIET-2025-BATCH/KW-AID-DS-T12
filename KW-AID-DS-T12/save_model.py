import pandas as pd
import numpy as np
import re
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder

# Define preprocessing function
def preprocess_text(text):
    if isinstance(text, str):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        return text
    return ""

# Load dataset
csv_file = "new_dataset.csv"  # Update with your path
df = pd.read_csv(csv_file, low_memory=False)

# Apply text preprocessing
if 'description' in df.columns and 'label' in df.columns:
    df['text_preprocessed'] = df['description'].apply(preprocess_text)
else:
    raise ValueError("CSV file must contain 'description' and 'label' columns")

# Ensure no empty texts remain
df['text_preprocessed'].replace('', np.nan, inplace=True)
df.dropna(subset=['text_preprocessed'], inplace=True)

# Use CountVectorizer to create a Bag of Words
vectorizer = CountVectorizer(max_features=10000)
X = vectorizer.fit_transform(df['text_preprocessed'])

# Encode labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df['label'])

# Train the full model (no need to split for saving)
lr_model = LogisticRegression(C=1.0, solver='lbfgs', max_iter=1000)
lr_model.fit(X, y)

# Save the model, vectorizer, and label encoder for use in the Flask app
with open('lr_model.pkl', 'wb') as f:
    pickle.dump(lr_model, f)
    
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)
    
with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(label_encoder, f)

print("Model, vectorizer, and label encoder saved successfully.")