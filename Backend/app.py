# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
import psycopg2
import numpy as np
import tensorflow as tf
import os
import base64
import io
from PIL import Image
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from dotenv import load_dotenv, find_dotenv
from tensorflow.keras.preprocessing import image

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder="static")
CORS(app)  # Allows requests from a different origin (e.g., your React app)
bcrypt = Bcrypt(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# Configure PostgreSQL connection using environment variables
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
conn.autocommit = True  # For simplicity; consider using transactions in production

# Load CNN Model
MODEL_PATH = "food_model_CNN.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Load class names from dataset directory
class_names = ["Biryani", "Dosa", "Idli", "Palak Paneer", "Shira", "Chapati", "Gulab Jamun", "Jalebi", "Poha", "Rice"]

def preprocess_image(image_data):
    """Preprocess image for model prediction."""
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((128, 128))
    image_array = np.array(image) / 255.0  # Normalize
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array


@app.route('/predict', methods=['POST'])
def predict():
    """Receives an image, predicts the food item, and fetches nutritional data."""
    try:
        data = request.json.get("image")  # Get base64 image data
        if not data:
            return jsonify({"error": "No image data provided"}), 400

        # Decode base64 image
        image_data = base64.b64decode(data.split(",")[1])
        processed_image = preprocess_image(image_data)

        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions)
        predicted_food = class_names[predicted_class_index]

        # Store food item in database
        cursor = conn.cursor()
        cursor.execute("INSERT INTO food_records (food_item) VALUES (%s) RETURNING id;", (predicted_food,))
        record_id = cursor.fetchone()[0]

        # Retrieve nutritional values
        cursor.execute("SELECT calories, protiens, fats, vitamins, minerals, quantity FROM nutrition WHERE food_item = %s", (predicted_food,))
        nutrition_data = cursor.fetchone()
        cursor.close()

        if nutrition_data:
            return jsonify({
                "food_item": predicted_food,
                "nutrition": {
                    "calories": nutrition_data[0],
                    "protiens": nutrition_data[1],
                    "fats": nutrition_data[2],
                    "vitamins": nutrition_data[3],
                    "minerals": nutrition_data[4],
                    "quantity": nutrition_data[5]
                },
                "record_id": record_id
            }), 200
        else:
            return jsonify({"error": "Nutritional data not found"}), 404
    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": "Prediction failed"}), 500

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    try:
        email = data['email']
        name = data['name']
        password = bcrypt.generate_password_hash(data['password']).decode('utf-8')  # Secure the password!
        gender = data['gender']
        
        # For numeric fields, convert to string for validation then convert to the proper type.
        if data.get('age') is None or str(data.get('age')).strip() == "":
            return jsonify({"error": "Age is required"}), 400
        age = int(data['age'])
        
        if data.get('height_ft') is None or str(data.get('height_ft')).strip() == "":
            return jsonify({"error": "Height (feet) is required"}), 400
        height_ft = int(data['height_ft'])
        
        if data.get('height_inch') is None or str(data.get('height_inch')).strip() == "":
            return jsonify({"error": "Height (inches) is required"}), 400
        height_inch = int(data['height_inch'])
        
        if data.get('weight') is None or str(data.get('weight')).strip() == "":
            return jsonify({"error": "Weight is required"}), 400
        weight = float(data['weight'])
        
        if data.get('goal') is None or str(data.get('goal')).strip() == "":
            return jsonify({"error": "Goal is required"}), 400
        goal = int(data['goal'])
        
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO User1 (Email, Name, PasswordHash, Gender, Age, HeightFeet, HeightInches, Weight, plan_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING UserID;
        """
        cursor.execute(insert_query, (email, name, password, gender, age, height_ft, height_inch, weight, goal))
        user_id = cursor.fetchone()[0]
        cursor.close()
        
        return jsonify({"message": "Signup successful", "user_id": user_id}), 201
    except Exception as e:
        print("Error during signup:", e)
        return jsonify({"error": "Signup failed"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT UserID, PasswordHash FROM User1 WHERE Email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            user_id, hashed_password = user
            if bcrypt.check_password_hash(hashed_password, password):
                access_token = create_access_token(identity=user_id)
                return jsonify({"message": "Login successful", "token": access_token}), 200

        return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print("Error during login:", e)
        return jsonify({"error": "Login failed"}), 500

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    return jsonify({"message": "Welcome to the dashboard!"}), 200

# New endpoint to fetch recommended recipes
@app.route('/api/recommended', methods=['GET'])
def get_recommended_recipes():
    plan_id = request.args.get("plan_id")
    if not plan_id:
        return jsonify({"error": "plan_id parameter is required"}), 400
    try:
        cursor = conn.cursor()
        query = """
            SELECT recommended_id, plan_id, recipe_name, ingredients, recipe_steps, image, calorie 
            FROM recommended 
            WHERE plan_id = %s 
            ORDER BY random() 
            LIMIT 5;
        """
        cursor.execute(query, (plan_id,))
        recipes = cursor.fetchall()
        cursor.close()

        recommended_recipes = []
        for row in recipes:
            recommended_recipes.append({
                "recommended_id": row[0],
                "plan_id": row[1],
                "recipe_name": row[2],
                "ingredients": row[3],
                "recipe_steps": row[4],
                "image": row[5],
                "calorie": row[6]
            })
        return jsonify(recommended_recipes), 200
    except Exception as e:
        print("Error fetching recommended recipes:", e)
        return jsonify({"error": "Failed to fetch recipes"}), 500
    
@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory("static/images", filename)

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
