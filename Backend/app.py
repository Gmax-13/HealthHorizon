# backend/app.py
from flask import Flask, request, jsonify
import psycopg2
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allows requests from a different origin (e.g., your React app)
bcrypt = Bcrypt(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# Configure PostgreSQL connection using environment variables
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
conn.autocommit = True  # For simplicity; consider using transactions in production

# **Signup Route**
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    try:
        email = data['email']
        name = data['name']
        password = bcrypt.generate_password_hash(data['password']).decode('utf-8')  # Secure the password!
        gender = data['gender']
        age = data['age']
        height_ft = data['height_ft']
        height_inch = data['height_inch']
        weight = data['weight']
        goal = data['goal']
        
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO User1 (email, name, password, gender, age, height_ft, height_inch, weight, goal)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """
        cursor.execute(insert_query, (email, name, password, gender, age, height_ft, height_inch, weight, goal))
        user_id = cursor.fetchone()[0]
        cursor.close()
        
        return jsonify({"message": "Signup successful", "user_id": user_id}), 201
    except Exception as e:
        print("Error during signup:", e)
        return jsonify({"error": "Signup failed"}), 500

# **Login Route**
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, password FROM User1 WHERE email = %s", (email,))
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

# **Protected Route Example (Requires Token)**
@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    return jsonify({"message": "Welcome to the dashboard!"}), 200

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)