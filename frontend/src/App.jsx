// File: frontend/src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar"; 
import RecipePage from "./pages/RecipePage";
import MealPlannerPage from "./pages/MealPlannerPage"; 

function App() {
    // State to hold the search parameters input from the Navbar
    const [globalSearchQuery, setGlobalSearchQuery] = useState({
        query: "",
        cuisine: "",
        maxCalories: ""
    });

    // Function passed to Navbar to update the global search state
    const handleGlobalSearch = (searchState) => {
        setGlobalSearchQuery(searchState);
    };

    return (
        <Router>
            {/* Pass the search handler to Navbar */}
            <Navbar onSearch={handleGlobalSearch} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Pass the search state to RecipePage */}
                <Route path="/recipes" element={<RecipePage globalSearch={globalSearchQuery} />} /> 
                <Route path="/meal-planner" element={<MealPlannerPage />} />
            </Routes>
        </Router>
    );
}

export default App;