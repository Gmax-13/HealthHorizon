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
    plan_id INT NOT NULL, -- 1 = Weight Loss, 2 = Weight Gain
    LogicState BOOLEAN DEFAULT TRUE, -- TRUE: Active, FALSE: Inactive
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES Plan(plan_id)
);

CREATE TABLE Plan (
    plan_id SERIAL PRIMARY KEY,
    plan_type VARCHAR(50) NOT NULL UNIQUE, -- 'Weight Gain' or 'Weight Loss'
    plan_name VARCHAR(100) NOT NULL  -- 'Weight Gain Plan' or 'Weight Loss Plan'
);
INSERT INTO Plan (plan_id, plan_type, plan_name) 
VALUES 
(1, 'Weight Loss', 'Weight Loss Plan'),
(2, 'Weight Gain', 'Weight Gain Plan');
SELECT * FROM Plan

-- RECORD SCREEN
CREATE TABLE food_records (
    id SERIAL PRIMARY KEY,
    food_item VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM food_records;

CREATE TABLE nutrition (
    food_item VARCHAR(255) PRIMARY KEY,
    calories INT NOT NULL,
	proteins INT NOT NULL,
	carbohydrates INT NOT NULL,
    fats INT NOT NULL,
	sugar INT NOT NULL,
    vitamins TEXT NOT NULL,
	minerals TEXT NOT NULL,
	quantity VARCHAR NOT NULL 
);
SELECT * FROM nutrition;
INSERT INTO nutrition (food_item, calories, proteins, carbohydrates, fats, sugar, vitamins, minerals, quantity) VALUES
('Biryani', 220, 20, 55, 32, 2, 'Vitamin A: ~5%, Vitamin C: ~10%', 'Iron: ~15%, Calcium: ~7%', 'For 100 grams (protien may vary with ingredients)'),
('Dosa', 168, 8, 17, 15, 2, 'Vitamin B6: ~8%, Vitamin C: ~4%', 'Iron: ~10%, Calcium: ~5%', 'For 1 Dosa'),
('Idli', 60, 3, 85, 5, 1, 'Vitamin B6: ~6%, Vitamin C: ~2%', 'Iron: ~8%, Calcium: ~4%', 'For 1 Idli'),
('Palak Paneer', 180, 11, 8, 15, 1, 'Vitamin A: ~40%, Vitamin C: ~15%', 'Calcium: ~20%, Iron: ~12%', 'For 100 grams'),
('Shira', 200, 6, 60, 20, 25, 'B Vitamins: ~5%', 'Calcium: ~4%, Iron: ~3%', 'For 100 grams'),
('Chapati', 120, 8, 73, 10, 1, 'B Vitamins(B1 & B3): ~8%', 'Iron: ~6%, Calcium: ~5%', 'For 1 Chapati'),
('Gulab Jamun', 280, 6, 80, 14, 75, 'Vitamin A: ~2%', 'Calcium: ~3%, Iron: ~2%', 'For 1 Gulab Jamun'),
('Jalebi', 320, 4, 65, 20, 55, 'Vitamin C: ~2%', 'Calcium: ~2%, Iron: ~2%', 'For 1 Jalebi '),
('Poha', 160, 6, 75, 12, 3, 'Vitamin C: ~8%', 'Iron: ~10%, Calcium: ~5%', 'For 100 grams'),
('Rice', 130, 3, 42, 1, 1, 'Thiamin (B1): ~10%', 'Iron: ~1%, Calcium: ~1%', 'For 100 grams');

DROP TABLE nutrition
--RECIPE SCREEN
CREATE TABLE recommended (
    recommended_id SERIAL PRIMARY KEY,
    plan_id INT NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    recipe_steps TEXT NOT NULL,
    image VARCHAR(255),
    calorie INT NOT NULL,
    CONSTRAINT fk_recommended_plan FOREIGN KEY (plan_id) REFERENCES Plan(plan_id)
);

INSERT INTO recommended (plan_id, recipe_name, ingredients, recipe_steps, image, calorie)
VALUES
-- Weight Loss Recipes (plan_id = 1)
(1, 'Sprouted Moong Salad', 
    'Sprouted moong, tomatoes, cucumber, lemon, salt, pepper', 
    'Mix all ingredients, drizzle with lemon juice, and serve fresh.', 
    'sprouted_moong_salad.jpg', 250),
(1, 'Oats Upma', 
    'Oats, mixed vegetables, mustard seeds, curry leaves, salt, oil', 
    'Sauté mustard seeds and curry leaves, add vegetables and oats, cook until done.', 
    'oats_upma.jpg', 300),
(1, 'Minimal Oil Vegetable Poha', 
    'Flattened rice, peas, carrots, turmeric, salt, mustard seeds', 
    'Rinse poha, sauté mustard seeds and turmeric with vegetables, then mix well.', 
    'veg_poha.jpg', 280),
(1, 'Grilled Chicken Salad', 
    'Chicken breast, mixed greens, cucumber, tomatoes, olive oil, lemon, salt', 
    'Grill the chicken, slice it, and toss with fresh greens and lemon dressing.', 
    'grilled_chicken_salad.jpg', 350),
(1, 'Quinoa Vegetable Soup', 
    'Quinoa, assorted vegetables, vegetable broth, herbs, salt, pepper', 
    'Boil vegetable broth, add chopped vegetables and quinoa, simmer until cooked.', 
    'veg_soup_quinoa.jpg', 300),

-- Weight Gain Recipes (plan_id = 2)
(2, 'Masala Omelette with Cheese', 
    'Eggs, onions, tomatoes, green chilies, cheese, salt, butter', 
    'Beat eggs with chopped vegetables, fry in butter, and add cheese before folding.', 
    'masala_omelette.jpg', 400),
(2, 'Pav Bhaji with Extra Butter', 
    'Mixed vegetables, pav bhaji masala, tomatoes, butter, pav', 
    'Cook and mash vegetables with spices, serve hot with buttered pav.', 
    'pav_bhaji.jpg', 600),
(2, 'Chicken Frankie', 
    'Chicken, tortilla wrap, onions, bell peppers, sauce, spices', 
    'Cook spiced chicken, fill the wrap with chicken and fresh veggies, drizzle sauce, and roll up.', 
    'chicken_frankie.jpg', 650),
(2, 'Paneer Tikka Masala with Naan', 
    'Paneer, yogurt, spices, tomato sauce, cream, naan', 
    'Marinate paneer in yogurt and spices, grill it, and then simmer in a tomato-cream sauce; serve with naan.', 
    'paneer_tikka.jpg', 800),
(2, 'Butter Chicken with Rice', 
    'Chicken, tomato puree, cream, butter, spices, rice', 
    'Cook chicken in a creamy tomato-butter sauce and serve hot with steamed rice.', 
    'butter_chicken.jpg', 900);

--PLAN SCREEN
CREATE TABLE plan_display (
    plan_display_id SERIAL PRIMARY KEY,
    plan_id INT NOT NULL,
    food_type VARCHAR(20) NOT NULL CHECK (food_type IN ('breakfast', 'lunch', 'dinner')),
    food_item_name VARCHAR(100) NOT NULL,
    calorie INT NOT NULL,
    image VARCHAR(255),
    CONSTRAINT fk_plan_display FOREIGN KEY (plan_id) REFERENCES Plan(plan_id)
);

INSERT INTO plan_display (plan_id, food_type, food_item_name, calorie, image)
VALUES
-- Weight Loss Plan (plan_id = 1)
(1, 'breakfast', 'Sprouted Moong Salad', 250, 'sprouted_moong_salad.jpg'),
(1, 'breakfast', 'Oats Upma', 300, 'oats_upma.jpg'),
(1, 'breakfast', 'Vegetable Poha with Minimal Oil', 280, 'veg_poha.jpg'),
(1, 'lunch', 'Grilled Chicken Salad', 350, 'grilled_chicken_salad.jpg'),
(1, 'lunch', 'Brown Rice and Lentil Curry', 400, 'brown_rice_lentils.jpg'),
(1, 'lunch', 'Mixed Vegetable Soup with Quinoa', 300, 'veg_soup_quinoa.jpg'),
(1, 'dinner', 'Steamed Fish with Vegetables', 350, 'steamed_fish.jpg'),
(1, 'dinner', 'Tofu Stir Fry with Brown Rice', 400, 'tofu_stir_fry.jpg'),
(1, 'dinner', 'Spinach and Chickpea Curry', 380, 'spinach_chickpea.jpg'),

-- Weight Gain Plan (plan_id = 2)
(2, 'breakfast', 'Masala Omelette with Cheese', 400, 'masala_omelette.jpg'),
(2, 'breakfast', 'Pav Bhaji with Extra Butter', 600, 'pav_bhaji.jpg'),
(2, 'breakfast', 'Poha with Peanuts', 350, 'poha.jpg'),
(2, 'lunch', 'Mumbai Thali', 700, 'mumbai_thali.jpg'),
(2, 'lunch', 'Bhelpuri with Extra Sev', 450, 'bhelpuri.jpg'),
(2, 'lunch', 'Chicken Frankie', 650, 'chicken_frankie.jpg'),
(2, 'dinner', 'Paneer Tikka Masala with Naan', 800, 'paneer_tikka.jpg'),
(2, 'dinner', 'Butter Chicken with Rice', 900, 'butter_chicken.jpg'),
(2, 'dinner', 'Mumbai Style Prawn Curry with Rice', 850, 'prawn_curry.jpg');

Drop table plan_display
SELECT * FROM plan_display WHERE plan_id = 1;
