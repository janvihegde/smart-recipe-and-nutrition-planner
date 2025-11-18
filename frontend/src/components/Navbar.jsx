import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUtensils, FaHome, FaHeart, FaChartPie } from "react-icons/fa";

export default function Navbar() {
    const location = useLocation();

    const navLinks = [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        { name: "Recipes", path: "/recipes", icon: <FaUtensils /> },   // ✔ WORKS NOW
        { name: "Favorites", path: "/favorites", icon: <FaHeart /> },
        { name: "Stats", path: "/stats", icon: <FaChartPie /> },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-logo">Smart Recipe Planner</div>

            <div className="navbar-links">
                {navLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        to={link.path}
                        className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                    >
                        <span className="nav-icon">{link.icon}</span>
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
