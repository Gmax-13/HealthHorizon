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

CREATE TABLE Plan (
    plan_id SERIAL PRIMARY KEY,
    plan_type VARCHAR(50), -- 'Weight Gain' or 'Weight Loss'
    plan_name VARCHAR(100), -- 'Weight Gain Plan' or 'Weight Loss Plan'
    description TEXT
);

CREATE TABLE MealPlans (
    meal_plan_id SERIAL PRIMARY KEY,
    plan_id INTEGER REFERENCES Plan (plan_id) ON DELETE CASCADE,
    meal_type VARCHAR(50), -- 'Breakfast', 'Lunch', 'Dinner'
    recipe_id INTEGER REFERENCES Recipes2(recipe_id), -- Reference to Recipes table
    image BYTEA, -- Store the image as binary
    calories INTEGER
);

CREATE TABLE Recipes2 (
    recipe_id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Ingredients TEXT NOT NULL,
    Instructions TEXT NOT NULL,
    Calories FLOAT CHECK (Calories > 0),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE HealthPlan (
    PlanID SERIAL PRIMARY KEY,
    UserID INT REFERENCES User1(UserID) ON DELETE CASCADE,
    PlanType VARCHAR(50) NOT NULL, -- e.g., Weight Loss, Muscle Gain
    TargetWeight FLOAT CHECK (TargetWeight > 0),
    DailyCalorieLimit FLOAT CHECK (DailyCalorieLimit > 0),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Weight Gain Plan
INSERT INTO Plan (plan_type, plan_name, description)
VALUES 
('Weight Gain', 'High-Calorie Plan', 'A meal plan to help increase muscle mass and support high-energy needs.');

-- Insert Weight Loss Plan
INSERT INTO Plan (plan_type, plan_name, description)
VALUES 
('Weight Loss', 'Low-Calorie Plan', 'A meal plan designed to promote fat loss while maintaining energy.');

-- Insert meals for Weight Gain Plan
SELECT * FROM Recipes WHERE recipe_id = 1;

-- Breakfast
INSERT INTO MealPlans (plan_id, meal_type, recipe_id, image, calories)
VALUES 
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Gain'), 'Breakfast', 1, pg_read_binary_file('C:\Images\Oats with Nuts & Fruits.png'), 200),
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Gain'), 'Lunch', 2, pg_read_binary_file('C:\Images\Brown Rice with Stir-fried Tofu.png'), 450),
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Gain'), 'Dinner', 3, pg_read_binary_file('C:\Images\Whole Wheat Pasta with Pesto.png'), 400);

-- Insert meals for Weight Loss Plan

-- Breakfast
INSERT INTO MealPlans (plan_id, meal_type, recipe_id, image, calories)
VALUES 
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Loss'), 'Breakfast', 4, pg_read_binary_file('C:\Images\Avocado Toast with Eggs.png'), 350),
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Loss'), 'Lunch', 5, pg_read_binary_file('C:\Images\Quinoa & Grilled Veggies.png'), 450),
((SELECT plan_id FROM Plan WHERE plan_type = 'Weight Loss'), 'Dinner', 6, pg_read_binary_file('C:\Images\Miso Soup with Tofu.png'), 130);

INSERT INTO Recipes2 (recipe_id, Name, Ingredients, Instructions, Calories) VALUES  
(1,'Oats with Nuts & Fruits',  
 'Oats (1/2 cup), Almonds (6), Walnuts (3 halves), Banana (1/2), Berries (1/4 cup), Honey (1 tsp), Milk (or water)',  
 '1. Cook oats with milk or water.\n2. Top with sliced banana, berries, nuts, and honey.\n3. Serve warm.',  
 350),  

(4,'Avocado Toast with Eggs',  
 'Whole Wheat Bread (1 slice), Avocado (1/2), Egg (1), Olive Oil (1 tsp), Salt, Pepper, Chili Flakes',  
 '1. Toast the bread.\n2. Mash avocado and spread it on the toast.\n3. Top with a fried or boiled egg.\n4. Drizzle with olive oil and season with salt, pepper, and chili flakes.',  
 300),  

(2,'Brown Rice with Stir-fried Tofu',  
 'Brown Rice (1 cup cooked), Tofu (100g), Bell Peppers (1/2 cup), Carrots (1/4 cup), Soy Sauce (1 tbsp), Olive Oil (1 tsp)',  
 '1. Cook brown rice and set aside.\n2. Heat olive oil and stir-fry tofu until golden.\n3. Add bell peppers and carrots, then stir-fry for 3 minutes.\n4. Mix in soy sauce and serve over brown rice.',  
 400),  

(3,'Whole Wheat Pasta with Pesto',  
 'Whole Wheat Pasta (1 cup cooked), Basil (1/2 cup), Olive Oil (2 tbsp), Parmesan Cheese (1 tbsp), Garlic (1 clove), Pine Nuts (1 tbsp)',  
 '1. Cook whole wheat pasta and drain.\n2. Blend basil, olive oil, parmesan, garlic, and pine nuts into a pesto sauce.\n3. Toss pasta with pesto and serve warm.',  
 450), 

 (5,'Quinoa & Grilled Veggies',  
 'Quinoa (1 cup cooked), Olive Oil (1 tsp), Bell Peppers (1/2 cup), Zucchini (1/4 cup), Carrots (1/4 cup), Mushrooms (1/4 cup), Chickpeas (1/4 cup), Feta Cheese (1 tbsp), Lemon Juice (1 tsp), Garlic (1 clove, minced)',  
 '1. Cook quinoa and set aside.\n2. Heat olive oil in a pan and grill bell peppers, zucchini, carrots, and mushrooms.\n3. Add chickpeas and sauté for 2 minutes.\n4. Mix grilled veggies with quinoa and top with feta cheese.\n5. Drizzle with lemon juice and serve warm.',  
 450), 

(6,'Miso Soup with Tofu',  
 'Miso Paste (1 tbsp), Soft Tofu (100g), Wakame Seaweed (1 tbsp), Green Onions (1 tbsp), Shiitake Mushrooms (1/4 cup), Water (250ml)',  
 '1. Heat water and dissolve miso paste.\n2. Add diced tofu, seaweed, and mushrooms.\n3. Simmer for 5 minutes and garnish with green onions.\n4. Serve hot.',  
 150);  

ALTER TABLE Users ADD COLUMN plan_id INTEGER REFERENCES Plan(plan_id) ON DELETE SET NULL;
SELECT column_name FROM information_schema.columns WHERE table_name = 'users';
UPDATE User1
SET plan_id = (SELECT plan_id FROM Plan WHERE plan_type = 'Weight Gain')
WHERE UserID = 1;

-- Get Meal Plan for a User
SELECT 
    u.name AS user_name,
    p.plan_name,
    mp.meal_type,
    r.name AS recipe_name,
    r.calories,
    mp.image
FROM 
    Users u
JOIN 
    Plan p ON u.plan_id = p.plan_id
JOIN 
    MealPlans mp ON p.plan_id = mp.plan_id
JOIN 
    Recipes2 r ON mp.recipe_id = r.recipe_id
WHERE 
    u.UserID = 1;

SELECT 
    p.plan_name,
    mp.meal_type,
    r.name AS recipe_name,
    r.calories,
    mp.image
FROM 
    Plan p
JOIN 
    MealPlans mp ON p.plan_id = mp.plan_id
JOIN 
    Recipes2 r ON mp.recipe_id = r.recipe_id
WHERE 
    p.plan_type = 'Weight Gain';


SELECT 
    r.name AS recipe_name, 
    r.calories, 
    mp.meal_type, 
    mp.image 
FROM 
    Recipes2 r
JOIN 
    MealPlans mp ON r.recipe_id = mp.recipe_id
JOIN 
    User1 u ON u.plan_id = mp.plan_id
WHERE 
    u.UserID = 1 
    AND r.calories <= (SELECT h.dailycalorielimit FROM HealthPlans h WHERE h.UserID = 1);

SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'recipes2';

ALTER TABLE Recipes2 ADD COLUMN image_path TEXT;
UPDATE Recipes2 
SET image_path = 
    CASE 
        WHEN name = 'Avocado Toast with Eggs' THEN 'C:\Images\Avocado Toast with Eggs.png'
        WHEN name = 'Quinoa & Grilled Veggies' THEN 'C:\Images\Quinoa & Grilled Veggies.png'
        WHEN name = 'Miso Soup with Tofu' THEN 'C:\Images\Miso Soup with Tofu.png'
        WHEN name = 'Oats with Nuts & Fruits' THEN 'C:\Images\Oats with Nuts & Fruits.png'
        WHEN name = 'Brown Rice with Stir-fried Tofu' THEN 'C:\Images\Brown Rice with Stir-fried Tofu.png'
        WHEN name = 'Whole Wheat Pasta with Pesto' THEN 'C:\Images\Whole Wheat Pasta with Pesto.png'
    END
WHERE name IN ('Avocado Toast with Eggs', 'Quinoa & Grilled Veggies', 'Miso Soup with Tofu', 'Oats with Nuts & Fruits', 'Brown Rice with Stir-fried Tofu', 'Whole Wheat Pasta with Pesto');
SELECT name, image_path FROM Recipes2;


CREATE OR REPLACE FUNCTION get_meal_plan_with_recipe(user_id INTEGER)
RETURNS TABLE(
    meal_type VARCHAR(50),
    recipe_name TEXT,
    calories FLOAT,
    ingredients TEXT,
    instructions TEXT,
    image_path TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        mp.meal_type, 
        r.name AS recipe_name, 
        r.calories, 
        r.ingredients, 
        r.instructions, 
        r.image_path
    FROM MealPlans mp
    JOIN Recipes2 r ON mp.recipe_id = r.recipe_id
    JOIN User1 u ON u.plan_id = mp.plan_id
    WHERE u.UserID = UserID;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_meal_plan_with_recipe(1);

ALTER TABLE Recipes2 
ALTER COLUMN name TYPE TEXT,
ALTER COLUMN ingredients TYPE TEXT,
ALTER COLUMN instructions TYPE TEXT,
ALTER COLUMN image_path TYPE TEXT;

SELECT column_name FROM information_schema.columns WHERE table_name = 'recipes2';
SELECT name, image_path FROM Recipes2 WHERE name = 'Avocado Toast with Eggs';



