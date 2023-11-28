# 🗨️ Sei - Sign Language AI Assistant

## Technologies Used
- Python
- OpenCV
- MediaPipe
- Scikit-Learn
- FastAPI
- Next.js
- OpenAI API
- Webcam Integration
- CSS
- HTML

## Project Overview

Sei - Sign Language AI Assistant is a groundbreaking project aimed at facilitating the learning of sign language through an interactive and intelligent web application. This project blends cutting-edge technologies and innovative methodologies to create a unique learning experience.

### Data Collection and Processing
- **Dataset Creation**: Utilized OpenCV to compile a dataset comprising 100 photos for each sign language letter, capturing diverse hand gestures.
- **Data Processing**: Employed MediaPipe for extracting hand landmarks, resulting in a comprehensive set of normalized x-y points for each letter.

### Model Development
- **Model Choice**: Selected RandomForestClassifier from Scikit-Learn, influenced by the specific characteristics of the dataset.
- **Training**: Efficiently trained the model to recognize sign language letters from the processed data.

### Web Application
- **Chatbot Integration**: Developed using Next.js, featuring a user-friendly chatbot designed to assist in learning sign language.
- **Instructional Design**: Provides clear instructions and illustrative images for each letter.
- **User Interaction**: Employs the user's webcam to evaluate their sign language gestures, leveraging our trained model.
- **API Integration**: Incorporated a FastAPI backend to seamlessly connect the model with the web app.
- **Chat Features**: Enhanced user experience through sophisticated prompt engineering techniques powered by the OpenAI API.


## Usage

https://sign-sensei.vercel.app/
