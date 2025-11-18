import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import RecipePage from "./pages/RecipePage";  // ← ADD THIS
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />

                <div className="page-main">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/recipes" element={<RecipePage />} />  {/* ← ADD THIS */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
