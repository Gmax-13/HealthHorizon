# backend/app.py
from flask import Flask, request, jsonify
import psycopg2
from werkzeug.security import generate_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows requests from a different origin (e.g., your React app)

# Configure your PostgreSQL connection (update with your actual DB credentials)
conn = psycopg2.connect(
    host="localhost",
    database="your_database",
    user="your_username",
    password="your_password"
)
conn.autocommit = True  # For simplicity; consider using transactions in production

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    try:
        email = data['email']
        name = data['name']
        password = generate_password_hash(data['password'])  # Secure the password!
        gender = data['gender']
        age = data['age']
        height_ft = data['height_ft']
        height_inch = data['height_inch']
        weight = data['weight']
        goal = data['goal']
        
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO users (email, name, password, gender, age, height_ft, height_inch, weight, goal)
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

if __name__ == '__main__':
    app.run(debug=True)
