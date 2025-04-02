# KW-AID-DS-T12

# 🏷️ Product Categorization Using Bag of Words

## 📌 Project Overview
This project categorizes product descriptions into predefined categories using **Natural Language Processing (NLP)** and **Machine Learning (ML)**. The model is trained using a **Bag of Words (BoW)** approach with **Logistic Regression** to classify product descriptions accurately.

## 🛠️ Features
- **Text Preprocessing**: Cleaning product descriptions by removing special characters and stopwords.
- **Feature Extraction**: Using CountVectorizer to create a Bag of Words representation.

- **Machine Learning Model**: Logistic Regression for product classification.
- **Model Evaluation**: Assessing performance using accuracy, precision, and F1-score.

---

## 📂 Dataset
The dataset contains:
- `description`: The textual content of the product.
- `label`: The product category.

📥 **Dataset Source: `https://www.kaggle.com/datasets/chinmayshanbhag/big-basket-products`**

---

## 🚀 Installation & Setup
### Prerequisites
Ensure you have **Python 3.x** installed.

### Clone the Repository
```bash
git clone https://github.com/KIET-2025-BATCH/KW-AID-DS-T12.git
cd KW-AID-DS-T12
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the Project
```bash
python save_model.py
python app.py
```

---

## 🏗️ Project Structure
```
├── static/              # Static files (images, JS, CSS)
│   ├── images/         # Image assets
│   │   ├── anjali.jpg
│   │   ├── aparna.jpg
│   │   ├── jaya1.jpg
│   │   ├── moksha1.jpg
│   │   ├── ramya.jpg
│   │   ├── satya.jpg
│   ├── script.js       # JavaScript file
│   ├── style.css       # CSS file
│
├── templates/          # HTML templates
│   ├── about.html
│   ├── index.html
│   ├── team.html
│
├── app.py              # Main Flask application
├── bag_of_words.txt    # Bag of Words vocabulary file
├── BagofWords.ipynb    # Jupyter notebook for exploration
├── label_encoder.pkl   # Encoded labels for categories
├── lr_model.pkl        # Trained Logistic Regression model
├── new_dataset.csv     # Dataset file
├── save_model.py       # Model training and saving script
├── vectorizer.pkl      # Vectorizer (CountVectorizer) file
```


```

---

## 📊 Results & Performance
- **Accuracy:** 90%+
- **F1-score:** High precision and recall in product categorization.


---

## 🎯 Future Enhancements
- 🔹 Implement **Deep Learning** models like CNNs and BERT.
- 🔹 Add **real-time product description validation**.
- 🔹 Expand classification to **multi-language support**.
- 🔹 Improve feature engineering using **word embeddings (Word2Vec, GloVe)**.

---

## 📜 References
- [Scikit-Learn Documentation](https://scikit-learn.org/)
- [NLTK Documentation](https://www.nltk.org/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [Kaggle Dataset](https://www.kaggle.com/datasets)

---

## 🤝 Contributing
Contributions are welcome! Feel free to **fork**, create a new branch, and submit a **pull request**.

```bash
git checkout -b feature-branch
git commit -m "Add new feature"
git push origin feature-branch
```

---

## 📧 Contact
For any inquiries, reach out via:
- 📩 Email: jayasridevireddy@gmail.com
- 🔗 LinkedIn: [jayasri-devi]([https://www.linkedin.com/in/jayasri-devi/])


### ⭐ If you found this project useful, give it a **star**! ⭐

