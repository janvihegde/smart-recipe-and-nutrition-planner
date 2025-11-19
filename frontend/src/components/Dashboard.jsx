// File: frontend/src/components/Dashboard.jsx

import React from "react";
// Added FaCalendarAlt and FaSearchPlus for new features
import { FaUtensils, FaCalendarAlt, FaSearchPlus } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
    const cards = [
        {
            title: "Recipes",
            icon: <FaUtensils className="dashboard-icon" />,
            description: "View all recipes and manage submissions",
            link: "/recipes",
            bgClass: "bg-primary-600 hover:bg-primary-700", // Indigo Theme
        },

        // NEW FEATURE
        {
            title: "Search & Filter",
            icon: <FaSearchPlus className="dashboard-icon" />,
            description: "Quickly find recipes by ingredients or calories",
            link: "/recipes", // Points to the RecipePage which now contains the search bar
            bgClass: "bg-secondary-500 hover:bg-secondary-600", // Secondary Theme
        },

        // NEW FEATURE
        {
            title: "Meal Planner",
            icon: <FaCalendarAlt className="dashboard-icon" />,
            description: "Plan your meals for the week (Coming Soon)",
            link: "/meal-planner",
            bgClass: "bg-indigo-500 hover:bg-indigo-600", // A complementary blue-indigo shade
        },
    ];

    return (
        <div className="dashboard-container">
            {/* Floating background shapes */}
            <div className="floating-shapes">
                {/* Using your provided Tailwind colors for shapes */}
                <div className="shape shape1" style={{ backgroundColor: '#4F46E5' }}></div>
                <div className="shape shape2" style={{ backgroundColor: '#6366F1' }}></div>
                <div className="shape shape3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}></div>
            </div>

            <h1 className="dashboard-title text-primary-800">Welcome to Smart Recipe Planner</h1>

            <div className="dashboard-cards">
                {cards.map((card, idx) => (
                    <a key={idx} href={card.link} className={`dashboard-card text-white ${card.bgClass}`}>
                        {card.icon}
                        <h2 className="dashboard-card-title">{card.title}</h2>
                        <p className="dashboard-card-desc">{card.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;