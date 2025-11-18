import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Smart Recipe Planner</p>
                <p>All rights reserved</p>
            </div>
        </footer>
    );
}
