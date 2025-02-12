# 🌱 Plant Disease Classification Using CNN

## 📌 About the Project
This project aims to classify plant diseases using **Convolutional Neural Networks (CNNs)**. The model is trained on labeled images of healthy and diseased plants to predict the disease category. By leveraging deep learning, this model can assist in **early detection of plant diseases**, leading to **better crop management** and **higher yields**.

### 🏆 Objectives
- **Develop an automated image classification system** for plant disease detection.
- **Enhance accuracy using deep learning techniques** like CNN.
- **Use data augmentation** to improve model generalization.
- **Evaluate model performance** and suggest improvements.

## 🚀 Features
- Image classification using a **deep learning CNN model**
- **Data Augmentation** for improved generalization
- **Multi-class classification** (Healthy, Powdery, Rust, etc.)
- **Model evaluation & accuracy testing**

## 📂 Dataset
- The dataset is structured as:
  ```
  Dataset/
  ├── Train/
  │   ├── Healthy/
  │   ├── Powdery/
  │   ├── Rust/
  ├── Validation/
  │   ├── Healthy/
  │   ├── Powdery/
  │   ├── Rust/
  ```

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/your-username/plant-disease-classification.git
 cd plant-disease-classification
```

### **2️⃣ Install Dependencies**
```sh
pip install -r requirements.txt
```

### **3️⃣ Train the Model**
```python
python train.py
```

### **4️⃣ Test the Model**
```python
python test.py --image_path test_image.jpg
```

## 🏗️ Model Architecture
The **Convolutional Neural Network (CNN)** is designed as follows:

```python
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(225, 225, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(64, activation='relu'))
model.add(Dense(3, activation='softmax'))
```

### 📜 Explanation of Code
1. **Data Preprocessing**
   - `ImageDataGenerator` is used for **rescaling and augmentation** (shear, zoom, flip).
   - Dataset is loaded using `flow_from_directory()`.

2. **Model Definition**
   - `Conv2D(32, (3,3), activation='relu')`: Extracts features from images.
   - `MaxPooling2D(pool_size=(2,2))`: Reduces dimensionality while retaining important features.
   - `Flatten()`: Converts 2D feature maps into a 1D array.
   - `Dense(64, activation='relu')`: Fully connected layer for learning patterns.
   - `Dense(3, activation='softmax')`: Outputs probabilities for 3 classes.

3. **Model Compilation & Training**
   - Compiled using **Adam optimizer** and **categorical crossentropy** loss.
   - Trained using **model.fit()** with training and validation sets.

4. **Model Evaluation & Testing**
   - Evaluates model accuracy using `model.evaluate()`.
   - Predicts new images using `model.predict()`.

## 📊 Evaluation
- **Accuracy:** ~85% (Baseline Model)
- **Loss Function:** Categorical Crossentropy
- **Optimizer:** Adam

## 🔥 Future Improvements
- Increase dataset size
- Implement Transfer Learning (VGG16, ResNet, MobileNet)
- Tune hyperparameters
- Improve model depth

## 🤝 Contributing
1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature-branch`)
3. **Commit** changes (`git commit -m "Added new feature"`)
4. **Push** to GitHub (`git push origin feature-branch`)
5. **Submit** a Pull Request

## 📜 License


---


