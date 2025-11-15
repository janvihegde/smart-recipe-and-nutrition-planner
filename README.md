🍽️ Smart Recipe Planner

A collaborative recipe management system with nutrition analysis and smart ingredient substitutions.

📌 Overview

The Smart Recipe Planner helps users create and manage recipes while automatically analyzing their nutritional content and suggesting healthy substitutions.
This README is written to ensure that any team member can understand, continue, and extend the project with ease.




📦 Folder Responsibilities
📁 controller/

Handles all HTTP requests.
Examples:

/recipes

/recipes/{id}

/recipes/nutrition

/recipes/substitute/{ingredient}

Everything the frontend calls is here.

📁 service/

Contains logic such as:

Calculating nutrition

Smart ingredient substitutions

Cleaning and validating data

Handling complex operations

Controller → Service → Repository.

📁 repository/

Contains interfaces for MongoDB operations using:

MongoRepository<Recipe, String>


Spring Boot auto-generates all CRUD operations.

📁 model/

Defines schemas stored in MongoDB.
Example:

@Document("recipe")
public class Recipe { ... }

📁 resources/

application.properties → MongoDB configuration

static/ → Only used if frontend is bundled inside backend (optional)

🛠️ Backend Features
✔️ CRUD Operations

Add a recipe

Update recipe

Delete recipe

Get single recipe

Get all recipes

✔️ Nutrition Analysis

Automatically calculates:

Calories

Protein

Fat

Carbs

Backend handles all calculations — frontend only displays results.

✔️ Smart Ingredient Substitutions

For any ingredient, backend returns healthier alternatives.

Example call:

GET /recipes/substitute/tomato

🎨 Frontend Responsibilities

The frontend team must build the UI and connect to backend APIs.

Pages to build:

Recipe List

View Recipe

Add Recipe

Edit Recipe

Nutrition Display

Smart Substitution Display

How to connect to backend (Axios/fetch):

Example:

fetch("http://localhost:8080/api/recipe")
  .then(res => res.json())
  .then(data => console.log(data));

🔌 API Endpoints
📍 GET — All Recipes
GET /api/recipe

📍 POST — Add Recipe
POST /api/recipe


Example body:

{
  "name": "Paneer Tikka",
  "ingredients": ["Paneer", "Curd", "Spices"],
  "instructions": "Mix and grill"
}

📍 GET — Nutrition Analysis
POST /api/recipe/nutrition

📍 GET — Smart Substitution
GET /api/recipe/substitute/{ingredient}

🧪 Testing Using Postman

Your team can test all backend APIs individually without frontend.

Example POST body for testing:

{
  "name": "Maggi",
  "ingredients": ["Noodles", "Masala"],
  "instructions": "Boil and mix"
}

👨‍👩‍👧‍👦 For the Team — How to Continue Development
🔧 Backend Developers

Add more API endpoints

Improve nutrition accuracy

Add new ingredient substitutions

Add weekly meal planner (future)

🎨 Frontend Developers

Build UI pages

Connect UI to backend

Display nutritional charts and values

Create search/filter UI

📄 Documentation Team

Add screenshots

Add API usage examples

Add a system architecture diagram

📘 Notes

backend logic is complete for CRUD + Nutrition + Substitutions..
