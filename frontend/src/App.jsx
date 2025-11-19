import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import RecipePage from "./pages/RecipePage";
import MealPlannerPage from "./pages/MealPlannerPage";
import { FaCalendarAlt, FaUtensils, FaSearch } from "react-icons/fa"; // Imported icons for clarity, though not strictly needed here

function App() {
    // State lifted to App.jsx to manage Navbar search
    const [globalSearchQuery, setGlobalSearchQuery] = useState({
        query: "",
        cuisine: "",
        maxCalories: ""
    });

    const handleGlobalSearch = (searchState) => {
        // Only update the state if a query is actually present
        if (searchState.query) {
             setGlobalSearchQuery(searchState);
        }
    };

    const resetGlobalSearch = () => {
        // 🛑 FIX: Function to clear the search state, breaking the re-render loop
        setGlobalSearchQuery({ query: "", cuisine: "", maxCalories: "" });
    };

    return (
        // UI Fix: Full-screen wrapper
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar onSearch={handleGlobalSearch} />
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        {/* 🛑 PASS BOTH STATE AND RESET FUNCTION 🛑 */}
                        <Route
                            path="/recipes"
                            element={<RecipePage
                                        globalSearch={globalSearchQuery}
                                        resetGlobalSearch={resetGlobalSearch}
                                    />}
                        />
                        <Route path="/meal-planner" element={<MealPlannerPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;