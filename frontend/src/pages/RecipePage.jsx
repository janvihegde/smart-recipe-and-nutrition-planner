import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { FaPlus } from "react-icons/fa";
import "../components/Dashboard.css";
import axios from "axios";

const RecipePage = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            name,
            ingredients: ingredients.split("\n"),
            instructions,
        };

        try {
            const res = await axios.post("/api/recipes", recipeData);
            setMessage("Recipe added successfully!");
            setName("");
            setIngredients("");
            setInstructions("");
        } catch (error) {
            console.error(error);
            setMessage("Failed to add recipe.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Add New Recipe
                </h1>

                {message && (
                    <p className="mb-4 text-center text-sm text-green-600 font-medium">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Recipe Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400"
                            placeholder="Enter recipe name"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Ingredients
                        </label>
                        <textarea
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-2 shadow-sm h-32 focus:ring-2 focus:ring-green-400"
                            placeholder="Enter each ingredient on a new line"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                            Instructions
                        </label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-2 shadow-sm h-40 focus:ring-2 focus:ring-green-400"
                            placeholder="Write the preparation steps here"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all"
                    >
                        Add Recipe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecipePage;
