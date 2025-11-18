import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import "../components/Dashboard.css";
import axios from "axios";

const DashboardPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details from backend
        axios
            .get("/api/dashboard") // replace with your backend endpoint
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Dashboard />
            {user && (
                <div className="mt-6 p-4 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Hello, {user.name}!</h2>
                    <p>Here’s a quick overview of your dashboard.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
