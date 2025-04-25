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
from dotenv import load_dotenv
from tensorflow.keras.preprocessing import image
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder="static")
CORS(app, resources={r"/*": {"origins": os.getenv("ALLOWED_ORIGIN", "*")}})
bcrypt = Bcrypt(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# Database connection function
def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

# Load CNN Model
MODEL_PATH = "food_model_CNN.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Load class names
class_names = ["Biryani", "Dosa", "Idli", "Palak Paneer", "Shira", "Chapati", "Gulab Jamun", "Jalebi", "Poha", "Rice"]

def preprocess_image(image_data):
    """Preprocess image for model prediction."""
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((128, 128))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.route('/predict', methods=['POST'])
def predict():
    """Receives an image, predicts the food item, and fetches nutritional data."""
    try:
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "No image data provided"}), 400

        image_data = base64.b64decode(data["image"].split(",")[1])
        user_id = data.get("user_id")  # Match frontend key
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400

        processed_image = preprocess_image(image_data)
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions)
        predicted_food = class_names[predicted_class_index]

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO food_records (food_item, user_id) VALUES (%s, %s) RETURNING id;",
            (predicted_food, user_id)
        )
        record_id = cursor.fetchone()[0]
        conn.commit()

        cursor.execute(
            "SELECT calories, proteins, carbohydrates, fats, sugar, vitamins, minerals, quantity FROM nutrition WHERE food_item = %s",
            (predicted_food,)
        )
        nutrition_data = cursor.fetchone()
        cursor.close()
        conn.close()

        if nutrition_data:
            return jsonify({
                "food_item": predicted_food,
                "nutrition": {
                    "calories": nutrition_data[0],
                    "proteins": nutrition_data[1],
                    "carbohydrates": nutrition_data[2],
                    "fats": nutrition_data[3],
                    "sugar": nutrition_data[4],
                    "vitamins": nutrition_data[5],
                    "minerals": nutrition_data[6],
                    "quantity": nutrition_data[7]
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
        required_fields = ['email', 'name', 'password', 'gender', 'age', 'height_ft', 'height_inch', 'weight', 'goal']
        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return jsonify({"error": f"{field} is required"}), 400

        email = data['email']
        name = data['name']
        password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        gender = data['gender']
        age = int(data['age'])
        height_ft = int(data['height_ft'])
        height_inch = int(data['height_inch'])
        weight = float(data['weight'])
        goal = int(data['goal'])

        conn = get_db_connection()
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO User1 (Email, Name, PasswordHash, Gender, Age, HeightFeet, HeightInches, Weight, plan_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING UserID;
        """
        cursor.execute(insert_query, (email, name, password, gender, age, height_ft, height_inch, weight, goal))
        user_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Signup successful", "user_id": user_id}), 201
    except Exception as e:
        print("Error during signup:", e)
        return jsonify({"error": "Signup failed"}), 500

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        logger.warning("Login attempt with missing email or password")
        return jsonify({"message": "Email and password are required", "success": False}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT UserID, PasswordHash, plan_id FROM User1 WHERE LOWER(Email) = LOWER(%s)",
            (email,)
        )
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if not user:
            logger.info(f"No user found for email: {email}")
            return jsonify({"message": "Invalid email or password", "success": False}), 401

        userid, password_hash, plan_id = user
        logger.info(f"User found: UserID={userid}, PlanID={plan_id}")

        if not bcrypt.check_password_hash(password_hash, password):
            logger.info(f"Password mismatch for UserID: {userid}")
            return jsonify({"message": "Invalid email or password", "success": False}), 401

        access_token = create_access_token(identity=userid)
        response = {
            "message": "Login successful",
            "success": True,
            "token": access_token,
            "user_id": userid,
            "plan_id": plan_id
        }
        logger.info(f"Login successful for UserID: {userid}, Response: {response}")
        return jsonify(response), 200
    except Exception as e:
        logger.error(f"Error during login: {str(e)}")
        return jsonify({"message": "Login failed due to server error", "success": False}), 500

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    return jsonify({"message": "Welcome to the dashboard!"}), 200

@app.route('/api/recommended', methods=['GET'])
def get_recommended_recipes():
    plan_id = request.args.get("plan_id")
    if not plan_id:
        return jsonify({"error": "plan_id parameter is required"}), 400
    try:
        conn = get_db_connection()
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
        conn.close()

        recommended_recipes = [
            {
                "recommended_id": row[0],
                "plan_id": row[1],
                "recipe_name": row[2],
                "ingredients": row[3],
                "recipe_steps": row[4],
                "image": row[5],
                "calorie": row[6]
            }
            for row in recipes
        ]
        return jsonify(recommended_recipes), 200
    except Exception as e:
        print("Error fetching recommended recipes:", e)
        return jsonify({"error": "Failed to fetch recipes"}), 500

@app.route('/api/plan_display', methods=['GET'])
def get_plan_display_items():
    plan_id = request.args.get("plan_id", type=int)
    if not plan_id:
        return jsonify({"error": "plan_id parameter is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    items = {}
    for meal in ['breakfast', 'lunch', 'dinner']:
        query = """
            SELECT food_item_name, calorie, image, food_type
            FROM plan_display
            WHERE plan_id = %s AND food_type = %s
            ORDER BY random()
            LIMIT 1;
        """
        cursor.execute(query, (plan_id, meal))
        row = cursor.fetchone()
        if row:
            items[meal] = {
                "food_item_name": row[0],
                "calorie": row[1],
                "image": row[2],
                "food_type": row[3]
            }
        else:
            items[meal] = None
    cursor.close()
    conn.close()
    return jsonify(items), 200

@app.route('/api/calories_today', methods=['GET'])
def get_calories_today():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "user_id parameter is required"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT COALESCE(SUM(n.calories), 0)
            FROM food_records fr
            JOIN nutrition n ON fr.food_item = n.food_item
            WHERE DATE(created_at) = CURRENT_DATE AND fr.user_id = %s;
        """, (user_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        fill = result[0] if result and result[0] is not None else 0
        return jsonify({"fill": fill}), 200
    except Exception as e:
        print("Error fetching today's calories:", e)
        return jsonify({"error": "Error calculating fill"}), 500

@app.route('/api/macros_today', methods=['GET'])
def get_macros_today():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "user_id parameter is required"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT AVG(n.carbohydrates), AVG(n.proteins), AVG(n.fats)
            FROM food_records fr
            JOIN nutrition n ON fr.food_item = n.food_item
            WHERE DATE(created_at) = CURRENT_DATE AND fr.user_id = %s;
        """, (user_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        avg_carbs = round(result[0]) if result and result[0] is not None else 0
        avg_proteins = round(result[1]) if result and result[1] is not None else 0
        avg_fats = round(result[2]) if result and result[2] is not None else 0
        return jsonify({
            "avg_carbs": avg_carbs,
            "avg_proteins": avg_proteins,
            "avg_fats": avg_fats
        }), 200
    except Exception as e:
        print("Error fetching today's macros:", e)
        return jsonify({"error": "Error calculating macros"}), 500

@app.route('/api/streak', methods=['GET'])
def get_streak():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "user_id parameter is required"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT COUNT(DISTINCT DATE(created_at))
            FROM food_records
            WHERE user_id = %s;
        """, (user_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        streak = result[0] if result and result[0] is not None else 0
        return jsonify({"streak": streak}), 200
    except Exception as e:
        print("Error fetching streak:", e)
        return jsonify({"error": "Error calculating streak"}), 500

@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory("static/images", filename)