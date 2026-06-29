# 🌿 Health Horizon
**AI-powered food recognition & nutrition tracking app for personalized weight management.**
Health Horizon is a full-stack web application that uses a Convolutional Neural Network (CNN) to identify Indian food items from photos and automatically log their nutritional data. Users receive personalized meal plans and recipe recommendations tailored to their weight-loss or weight-gain goals.
---
## ✨ Features
| Feature | Description |
|---|---|
| **📸 Food Recognition** | Capture or upload a food photo — a CNN model identifies the dish and returns detailed nutritional info (calories, macros, vitamins, minerals). |
| **📊 Dashboard** | At-a-glance daily summary with a calorie ring, macronutrient breakdown (carbs / protein / fat), weekly calendar, and tracking streak. |
| **🍽️ Meal Plans** | Day-by-day breakfast, lunch, and dinner suggestions matched to the user's chosen plan (Weight Loss or Weight Gain). |
| **📖 Recipe Recommendations** | Curated recipes with ingredients, step-by-step instructions, calorie counts, and food images — filtered by plan type. |
| **👤 Multi-step Signup** | Guided onboarding collecting email, name, password, gender, age, height, weight, and goal — with smart plan recommendations based on weight. |
| **🔐 Authentication** | Secure login with bcrypt password hashing and JWT access tokens. |
| **🔥 Streak Tracking** | Counts the number of distinct days a user has logged food to encourage consistency. |
---
## 🏗️ Architecture
```
health-horizon/
├── public/                  # Static assets served by React
│   ├── index.html           # HTML entry point
│   └── *.png                # Profile & food images
├── src/                     # React frontend source
│   ├── App.js               # All page components & routing
│   ├── index.js             # React DOM entry point
│   ├── SignupContext.js      # Context API for multi-step signup state
│   ├── styles.css            # Global stylesheet
│   └── *.png                # UI icons (gallery, record, etc.)
├── Backend/                 # Flask API server
│   ├── app.py               # API routes & CNN inference
│   ├── food_model_CNN.keras # Pre-trained TensorFlow/Keras CNN model
│   ├── hh.sql               # PostgreSQL database schema & seed data
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile             # Gunicorn process declaration (deployment)
│   └── static/images/       # Recipe & meal plan food images
├── TEST IMAGES/             # Sample images for testing the CNN model
├── package.json             # Node.js dependencies & scripts
└── .env                     # Frontend environment variables
```
### Tech Stack
| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router v7, React Webcam, Axios |
| **Backend** | Python, Flask, Flask-CORS, Flask-Bcrypt, Flask-JWT-Extended |
| **ML Model** | TensorFlow / Keras CNN (`.keras` format) |
| **Database** | PostgreSQL (via `psycopg2`) |
| **Deployment** | Gunicorn (Procfile), `serve` for static frontend |
---
## 🚀 Getting Started
### Prerequisites
- **Node.js** ≥ 18
- **Python** ≥ 3.9
- **PostgreSQL** ≥ 13
- **pip** (Python package manager)
### 1. Clone the Repository
```bash
git clone https://github.com/Gmax-13/HealthHorizon.git
cd health-horizon
```
### 2. Set Up the Database
Create the PostgreSQL database and tables using the provided SQL file:
```bash
psql -U postgres
```
```sql
-- Inside the psql shell:
CREATE DATABASE health__horizon;
\c health__horizon
\i Backend/hh.sql
```
This creates all required tables (`User1`, `Plan`, `food_records`, `nutrition`, `recommended`, `plan_display`) and seeds them with initial data including:
- 2 plans (Weight Loss & Weight Gain)
- 10 food items with full nutritional data
- 10 recommended recipes (5 per plan)
- 18 meal plan display entries (9 per plan)
### 3. Configure Environment Variables
**Backend** — create `Backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost/health__horizon
JWT_SECRET_KEY=your-secret-key-here
ALLOWED_ORIGIN=http://localhost:3000
```
**Frontend** — create `.env` in the project root:
```env
REACT_APP_API_URL=http://localhost:5000
```
### 4. Install & Run the Backend
```bash
cd Backend
pip install -r requirements.txt
python app.py
```
The Flask server starts on `http://localhost:5000`.
> **Note:** The first startup may take a moment as TensorFlow loads the CNN model (`food_model_CNN.keras`, ~24 MB).
### 5. Install & Run the Frontend
```bash
# From the project root
npm install
npm start
```
The React development server starts on `http://localhost:3000`.
---
## 📡 API Reference
All endpoints are served by the Flask backend at the configured `REACT_APP_API_URL`.
### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate and receive a JWT |
| `GET` | `/dashboard` | Protected route (requires JWT) |
#### `POST /signup`
**Body:**
```json
{
  "email": "user@example.com",
  "name": "John",
  "password": "securepass",
  "gender": "male",
  "age": 25,
  "height_ft": 5,
  "height_inch": 10,
  "weight": 70.5,
  "goal": 1
}
```
- `goal`: `1` = Weight Loss, `2` = Weight Gain
**Response:** `201 Created`
```json
{ "message": "Signup successful", "user_id": 1 }
```
#### `POST /login`
**Body:**
```json
{ "email": "user@example.com", "password": "securepass" }
```
**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "success": true,
  "token": "eyJhbGciOiJI...",
  "user_id": 1,
  "plan_id": 1
}
```
---
### Food Recognition
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/predict` | Classify a food image and return nutritional data |
#### `POST /predict`
**Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "user_id": 1
}
```
**Response:** `200 OK`
```json
{
  "food_item": "Biryani",
  "nutrition": {
    "calories": 220,
    "proteins": 20,
    "carbohydrates": 55,
    "fats": 32,
    "sugar": 2,
    "vitamins": "Vitamin A: ~5%, Vitamin C: ~10%",
    "minerals": "Iron: ~15%, Calcium: ~7%",
    "quantity": "For 100 grams"
  },
  "record_id": 42
}
```
---
### Nutrition & Tracking
| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/calories_today` | `user_id` | Total calories consumed today |
| `GET` | `/api/macros_today` | `user_id` | Average carbs, protein, fat percentages for today |
| `GET` | `/api/streak` | `user_id` | Number of distinct days with food records |
---
### Meal Plans & Recipes
| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/recommended` | `plan_id` | 5 random recipes for the given plan |
| `GET` | `/api/plan_display` | `plan_id` | 1 random meal per type (breakfast, lunch, dinner) |
| `GET` | `/static/images/<filename>` | — | Serve recipe/meal plan images |
---
## 🧠 CNN Model
The food recognition model is a Convolutional Neural Network trained to classify **10 Indian food categories**:
| # | Food Item |
|---|---|
| 1 | Biryani |
| 2 | Dosa |
| 3 | Idli |
| 4 | Palak Paneer |
| 5 | Shira |
| 6 | Chapati |
| 7 | Gulab Jamun |
| 8 | Jalebi |
| 9 | Poha |
| 10 | Rice |
### Image Preprocessing Pipeline
1. Decode base64 image data
2. Resize to **128 × 128** pixels
3. Normalize pixel values to `[0, 1]`
4. Expand dimensions to create a batch of 1
The model file (`food_model_CNN.keras`, ~24 MB) is loaded once at server startup.
---
## 🗄️ Database Schema
```mermaid
erDiagram
    Plan ||--o{ User1 : "has"
    Plan ||--o{ recommended : "has"
    Plan ||--o{ plan_display : "has"
    User1 ||--o{ food_records : "logs"
    nutrition ||--o{ food_records : "describes"
    Plan {
        SERIAL plan_id PK
        VARCHAR plan_type
        VARCHAR plan_name
    }
    User1 {
        SERIAL UserID PK
        VARCHAR Email UK
        VARCHAR Name
        VARCHAR PasswordHash
        VARCHAR Gender
        INT Age
        INT HeightFeet
        INT HeightInches
        FLOAT Weight
        INT plan_id FK
        BOOLEAN LogicState
        TIMESTAMP CreatedAt
    }
    food_records {
        SERIAL id PK
        VARCHAR food_item
        INT user_id FK
        TIMESTAMP created_at
    }
    nutrition {
        VARCHAR food_item PK
        INT calories
        INT proteins
        INT carbohydrates
        INT fats
        INT sugar
        TEXT vitamins
        TEXT minerals
        VARCHAR quantity
    }
    recommended {
        SERIAL recommended_id PK
        INT plan_id FK
        VARCHAR recipe_name
        TEXT ingredients
        TEXT recipe_steps
        VARCHAR image
        INT calorie
    }
    plan_display {
        SERIAL plan_display_id PK
        INT plan_id FK
        VARCHAR food_type
        VARCHAR food_item_name
        INT calorie
        VARCHAR image
    }
```
---
## 📱 Application Screens
| Screen | Route | Description |
|---|---|---|
| Home | `/` | Landing page with Sign Up / Log In |
| Login | `/login` | Email & password authentication |
| Signup (6 steps) | `/signup-*` | Email → Name → Password → Gender → Age → Measurements → Goal |
| Dashboard | `/dashboard` | Calorie ring, macros, weekly view, streak |
| Record | `/record` | Webcam capture / gallery upload → CNN prediction → nutritional review |
| Recipe | `/recipe` | Recommended recipes grid with detail overlay |
| Plan | `/plan` | Daily meal plan (yesterday / today / tomorrow) with calorie progress bar |
| Profile | `/Profile` | Settings & logout |
---
## 🚢 Deployment
### Backend (e.g., Railway, Heroku)
The project includes a `Procfile` for Gunicorn:
```
web: gunicorn app:app
```
Set the following environment variables on your hosting platform:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET_KEY` | Secret key for JWT token signing |
| `ALLOWED_ORIGIN` | Frontend URL for CORS (e.g., `https://your-app.com`) |
### Frontend
Build the production bundle and serve with the `serve` package:
```bash
npm run build   # Creates optimized build/ directory
npm start       # Serves the build/ directory via `serve -s build`
```
Or deploy the `build/` folder to any static hosting provider (Vercel, Netlify, etc.).
Update `.env` to point to your deployed backend:
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```
---
## 📁 Project Dependencies
### Frontend (`package.json`)
| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework (v19) |
| `react-router-dom` | Client-side routing (v7) |
| `react-webcam` | Camera capture component |
| `axios` | HTTP client |
| `serve` | Static file server for production |
### Backend (`requirements.txt`)
| Package | Purpose |
|---|---|
| `flask` | Web framework |
| `flask-cors` | Cross-Origin Resource Sharing |
| `flask-bcrypt` | Password hashing |
| `flask-jwt-extended` | JWT authentication |
| `psycopg2-binary` | PostgreSQL driver |
| `tensorflow-cpu` | CNN model inference |
| `pillow` | Image processing |
| `numpy` | Numerical operations |
| `gunicorn` | Production WSGI server |
| `python-dotenv` | Environment variable loading |
---
## 📄 License
This project is private and not currently licensed for distribution.
---
<p align="center">
  Built with ❤️ by the Health Horizon team
</p>
