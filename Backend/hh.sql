CREATE DATABASE health__horizon;

CREATE TABLE User1 (
    UserID SERIAL PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Name VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Gender VARCHAR(10),
    Age INT CHECK (Age > 0),
    HeightFeet INT CHECK (HeightFeet >= 0),
    HeightInches INT CHECK (HeightInches BETWEEN 0 AND 11),
    Weight FLOAT CHECK (Weight > 0),
	plan_id INT,
    LogicState BOOLEAN DEFAULT TRUE, -- TRUE: Active, FALSE: Inactive
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM User1

CREATE TABLE Plan (
    plan_id SERIAL PRIMARY KEY,
    plan_type VARCHAR(50), -- 'Weight Gain' or 'Weight Loss'
    plan_name VARCHAR(100), -- 'Weight Gain Plan' or 'Weight Loss Plan'
);

CREATE TABLE MealPlans (
    meal_plan_id SERIAL PRIMARY KEY,
    plan_id INTEGER REFERENCES Plan (plan_id) ON DELETE CASCADE,
    meal_type VARCHAR(50), -- 'Breakfast', 'Lunch', 'Dinner'
    recipe_id INTEGER REFERENCES Recipes2(recipe_id), -- Reference to Recipes table
    image BYTEA, -- Store the image as binary
    calories INTEGER
);

CREATE TABLE food_records (
    id SERIAL PRIMARY KEY,
    food_item VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM food_records;

CREATE TABLE nutrition (
    food_item VARCHAR(255) PRIMARY KEY,
    calories INT NOT NULL,
    fats FLOAT NOT NULL,
    vitamins TEXT NOT NULL
);
SELECT * FROM nutrition;
INSERT INTO nutrition (food_item, calories, fats, vitamins) VALUES
('Biryani', 450, 15.0, 'Vitamin A, Vitamin C, Iron'),
('Dosa', 168, 6.0, 'Vitamin B6, Vitamin C, Iron'),
('Idli', 58, 0.4, 'Vitamin B6, Iron'),
('Palak Paneer', 350, 25.0, 'Vitamin A, Vitamin C, Calcium, Iron'),
('Shira', 250, 10.0, 'Vitamin A, Calcium'),
('Chapati', 120, 3.0, 'Vitamin B1, Vitamin B3, Iron'),
('Gulab Jamun', 150, 7.5, 'Calcium'),
('Jalebi', 150, 5.0, 'Vitamin C'),
('Poha', 180, 5.0, 'Vitamin A, Vitamin C, Iron'),
('Rice', 130, 0.3, 'Vitamin B1, Vitamin B3, Iron');

UPDATE nutrition
SET food_item = CASE
    WHEN food_item = 'Idli' THEN 'Idali'
    WHEN food_item = 'Chapati' THEN 'chapati photo'
    WHEN food_item = 'Palak Paneer' THEN 'Palak paneer'
	WHEN food_item = 'Gulab Jamun' THEN 'gulab jamun'
	WHEN food_item = 'Jalebi' THEN 'jalebi'
	WHEN food_item = 'Poha' THEN 'poha'
	WHEN food_item = 'Rice' THEN 'rice_images'
	ELSE food_item
END
WHERE food_item IN ('Idli', 'Shira', 'Chapati', 'Palak Paneer', 'Gulab Jamun', 'Jalebi', 'Poha', 'Rice');
