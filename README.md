# 🥗 Smart Recipe & Nutrition Planner

> A modern, full-stack application to manage your recipes, analyze nutrition automatically, and plan your weekly meals with style.




## 📖 Overview

**Smart Recipe Planner** is designed to take the hassle out of healthy eating. Unlike standard recipe books, this application uses external APIs to automatically calculate the nutritional value (calories, protein, fat, etc.) of any recipe you add. It also features an interactive "Click-to-Fill" weekly meal planner and a stunning **Glassmorphism UI**.

### ✨ Key Features

* **🥑 Smart Nutrition Analysis:** Automatically calculates calories and macronutrients for any ingredient list using the CalorieNinjas API.
* **🔄 Ingredient Substitutions:** Suggests healthy alternatives for common ingredients.
* **📅 Interactive Meal Planner:** Visually plan your Breakfast, Lunch, and Dinner for the entire week.
* **🎨 Glassmorphism UI:** A beautiful, modern interface built with React and Tailwind CSS v4, featuring translucent cards and smooth animations.
* **🔍 Instant Search:** Filter your recipe collection instantly by name, cuisine, or calories.
* **📊 Dashboard Overview:** Quick insights into your recipe collection.

---

## 🛠️ Tech Stack

### **Frontend**
* **React (Vite):** Fast, modern UI framework.
* **Tailwind CSS v4:** Utility-first styling with custom animations.
* **React Icons:** For beautiful, consistent iconography.
* **Axios:** For seamless API communication.

### **Backend**
* **Java Spring Boot:** Robust REST API backend.
* **MongoDB:** NoSQL database for storing recipes and meal plans.
* **Maven:** Dependency management.
* **External APIs:** CalorieNinjas (Nutrition Data).

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* **Node.js** (v16 or higher)
* **Java JDK** (17 or higher)
* **MongoDB** (Running locally or a simplified Atlas URI)

### 1️⃣ Backend Setup (Spring Boot)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Configure your database in `src/main/resources/application.properties`:
    ```properties
    spring.data.mongodb.uri=mongodb://localhost:27017/smartrecipe
    ```
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

### 2️⃣ Frontend Setup (React + Vite)

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser at `http://localhost:5173` to see the app!

---


## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/recipe` | Get all recipes |
| `POST` | `/api/recipe` | Add a new recipe (triggers nutrition analysis) |
| `GET` | `/api/recipe/search?query=...` | Search recipes by keyword |
| `GET` | `/api/mealplan/latest` | Fetch the current weekly plan |
| `POST` | `/api/mealplan` | Save/Update a weekly plan |

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for features (like an automated shopping list or user auth), feel free to fork the repo and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by Janvi Hegde and Manasvi HEgde
