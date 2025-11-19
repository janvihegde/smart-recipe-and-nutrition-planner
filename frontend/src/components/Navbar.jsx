import React, { useState } from "react";
import { FaUtensils, FaCalendarAlt, FaSearch, FaSpinner } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        if (isSearching || searchQuery.trim() === "") return;

        setIsSearching(true);
        // 1. Navigate to the recipes page if not already there
        if (location.pathname !== "/recipes") {
            await navigate("/recipes");
        }

        // 2. Pass the search query up to App.jsx to trigger filtering
        onSearch({ query: searchQuery.trim(), cuisine: '', maxCalories: '' });

        setIsSearching(false);
    };

    const navItems = [
        { name: "Dashboard", path: "/", icon: <FaUtensils className="mr-2" /> },
        { name: "Recipes", path: "/recipes", icon: <FaUtensils className="mr-2" /> },
        { name: "Meal Planner", path: "/meal-planner", icon: <FaCalendarAlt className="mr-2" /> },
    ];

    return (
        <nav className="bg-primary-800 shadow-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Title - Light text on dark background (Primary-100 is light Indigo) */}
                    <a href="/" className="flex-shrink-0 flex items-center text-xl font-extrabold text-primary-100 hover:text-primary-50 transition-colors">
                        SmartRecipe
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        {navItems.map(item => (
                            <a
                                key={item.path}
                                href={item.path}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors
                                    ${location.pathname === item.path
                                        ? 'border-secondary-400 text-secondary-200'
                                        : 'border-transparent text-primary-100 hover:border-primary-400 hover:text-primary-50'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Search Bar - ONLY location for general search */}
                    <form onSubmit={handleSearchSubmit} className="flex space-x-2">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search name, ingredient..."
                            className="px-3 py-1.5 border border-primary-500 rounded-lg text-gray-800 text-sm focus:ring-secondary-400 focus:border-secondary-400 bg-white"
                            disabled={isSearching}
                        />
                        <button
                            type="submit"
                            className="p-2 bg-secondary-500 text-primary-50 rounded-lg hover:bg-secondary-600 transition-colors disabled:opacity-50"
                            disabled={isSearching}
                        >
                            {isSearching ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaSearch />
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;