// File: frontend/src/pages/RecipePage.jsx

import React, { useState, useEffect, useCallback } from "react";
import RecipeCard from "../components/RecipeCard";
import { FaPlus, FaSpinner } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "/api/recipe";

// Component now receives global search state and reset function from App.jsx
const RecipePage = ({ globalSearch, resetGlobalSearch }) => {
    // Form state
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [calories, setCalories] = useState("");

    // UI State
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Function to fetch recipes (Handles global search from Navbar)
    const fetchRecipes = useCallback(async () => {
        setIsSearching(true);
        const params = {};

        // Use global search query from Navbar if present
        if (globalSearch.query) {
            params.query = globalSearch.query;
            if (globalSearch.cuisine) params.cuisine = globalSearch.cuisine;
            if (globalSearch.maxCalories) params.maxCalories = parseInt(globalSearch.maxCalories) || undefined;
        }

        const url = params.query ? `${API_BASE_URL}/search` : API_BASE_URL;

        try {
            const response = await axios.get(url, { params });
            setRecipes(response.data);

            // 🛑 FIX: Call the reset function to prevent infinite re-rendering of the component
            if (globalSearch.query) {
                resetGlobalSearch();
            }

        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            setMessage("Error connecting to database or fetching recipes.");
        } finally {
            setIsSearching(false);
        }
    }, [globalSearch.query, globalSearch.cuisine, globalSearch.maxCalories, resetGlobalSearch]);

    // Fetch recipes when the component mounts or when the global search query changes
    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        const recipeData = {
            name,
            ingredients: ingredients.split('\n').map(ing => ing.trim()).filter(ing => ing.length > 0),
            instructions,
            cuisine,
            calories: parseInt(calories) || 0,
        };

        try {
            const res = await axios.post(API_BASE_URL, recipeData);
            setMessage(`Recipe '${res.data.name}' added successfully! Nutrition analysis and substitutions running...`);

            // Clear form state locally
            setName("");
            setIngredients("");
            setInstructions("");
            setCuisine("");
            setCalories("");

            // Re-fetch the list
            fetchRecipes();

        } catch (error) {
            console.error("Failed to add recipe:", error.response?.data || error.message);
            setMessage("Failed to add recipe. Check console for API connection details.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex justify-center p-6 pt-10">
            <div className="flex flex-col gap-10 w-full max-w-6xl">

                {/* Add New Recipe Section (Form) */}
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full border border-primary-200 mx-auto max-w-3xl">
                    <h1 className="text-3xl font-extrabold mb-8 text-center text-primary-800">
                        Add New Recipe
                    </h1>

                    {message && (
                        <p className={`mb-4 text-center text-sm p-3 rounded-lg
                            ${message.startsWith('Failed') ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'} font-medium`}>
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Input Fields - Ensure text-gray-800 is used for text color */}
                        {/* 1. Recipe Name */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Recipe Name</label>
                            <input
                                type="text"
                                value={name}
                                // 🛑 FIX: onChange handler is the only thing controlling state, preventing reset
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-gray-800"
                                placeholder="Enter recipe name"
                            />
                        </div>

                        {/* 2. Cuisine & Calories */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block font-semibold text-gray-700 mb-1">Cuisine (Optional)</label>
                                <input
                                    type="text"
                                    value={cuisine}
                                    onChange={(e) => setCuisine(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-secondary-400 focus:border-secondary-400 text-gray-800"
                                    placeholder="e.g., Italian, Mexican"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block font-semibold text-gray-700 mb-1">Calories (Approx.)</label>
                                <input
                                    type="number"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    min="0"
                                    disabled={isLoading}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-secondary-400 focus:border-secondary-400 text-gray-800"
                                    placeholder="e.g., 450"
                                />
                            </div>
                        </div>

                        {/* 3. Ingredients */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Ingredients (One per line)</label>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm h-32 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-gray-800"
                                placeholder="Enter ingredients one per line"
                            />
                        </div>

                        {/* 4. Instructions */}
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Instructions</label>
                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                required
                                disabled={isLoading}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm h-40 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-gray-800"
                                placeholder="Write the preparation steps here..."
                            />
                        </div>

                        {/* Submit Button (text-primary-50 for color contrast) */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-600 text-primary-50 py-3 rounded-xl text-lg font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin inline mr-2" />
                            ) : (
                                <FaPlus className="inline mr-2" />
                            )}
                            {isLoading ? "Saving Recipe..." : "Add Smart Recipe"}
                        </button>
                    </form>
                </div>

                {/* 🛑 SEARCH AND FILTER SECTION REMOVED - PER USER REQUEST 🛑 */}

                {/* List Recipes Section */}
                <div className="w-full mx-auto">
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-primary-800">
                        {globalSearch.query
                            ? `Search Results for "${globalSearch.query}" (${recipes.length})`
                            : `All Saved Recipes (${recipes.length})`
                        }
                    </h2>

                    {isSearching ? (
                        <p className="text-center text-primary-500 p-8 border border-primary-200 bg-white rounded-xl shadow-lg">
                            <FaSpinner className="animate-spin inline mr-2" /> Loading recipes...
                        </p>
                    ) : recipes.length === 0 ? (
                        <p className="text-center text-gray-500 p-8 border border-gray-200 bg-white rounded-xl shadow-lg">No recipes found. Add one above! 🍜</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipePage;