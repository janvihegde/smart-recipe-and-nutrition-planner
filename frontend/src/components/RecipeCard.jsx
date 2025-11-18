import React from "react";
import "./Dashboard.css";


const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white">
            <img
                src={recipe.image || "https://via.placeholder.com/300"}
                alt={recipe.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />

            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">
                    {recipe.name}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center justify-between mt-2">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            {recipe.category || "General"}
          </span>
                    <span className="text-xs text-gray-500">⏱ {recipe.time || "30 min"}</span>
                </div>

                <button className="mt-3 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                    View Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;