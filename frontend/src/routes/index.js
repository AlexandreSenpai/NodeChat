import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "../pages/Login";
import Chat from "../pages/Chat";
import Register from "../pages/Register";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}
