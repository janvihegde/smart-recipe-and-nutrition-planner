import React from "react";
import { FaUtensils, FaShoppingCart, FaCalendarAlt, FaHeart, FaChartBar } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
    const cards = [
        {
            title: "Recipes",
            icon: <FaUtensils className="dashboard-icon" />,
            description: "Explore and manage your recipes",
            link: "/recipes",
            bgClass: "bg-green",
        },

        {
            title: "Favorites",
            icon: <FaHeart className="dashboard-icon" />,
            description: "Quick access to favorites",
            link: "/favorites",
            bgClass: "bg-pink",
        },
        {
            title: "Stats",
            icon: <FaChartBar className="dashboard-icon" />,
            description: "View your cooking stats",
            link: "/stats",
            bgClass: "bg-yellow",
        },
    ];

    return (
        <div className="dashboard-container">
            {/* Floating background shapes */}
            <div className="floating-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
            </div>

            <h1 className="dashboard-title">Welcome to Smart Recipe Planner</h1>

            <div className="dashboard-cards">
                {cards.map((card, idx) => (
                    <a key={idx} href={card.link} className={`dashboard-card ${card.bgClass}`}>
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
