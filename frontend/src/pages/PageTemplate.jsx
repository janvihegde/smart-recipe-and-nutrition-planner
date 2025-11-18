import React from "react";
import "./PageTemplate.css";

const PageTemplate = ({ title, description, icon }) => {
    return (
        <div className="page-container">
            {/* Floating background shapes */}
            <div className="floating-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
            </div>

            <div className="page-header">
                {icon && <div className="page-icon">{icon}</div>}
                <h1 className="page-title">{title}</h1>
                {description && <p className="page-description">{description}</p>}
            </div>

            <div className="page-content">
                {/* Page-specific content goes here */}
            </div>
        </div>
    );
};

export default PageTemplate;
