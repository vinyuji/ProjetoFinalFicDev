import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";

import { isAuthenticated } from './utils/is-authenticated';

export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <Routes>
                <Route />
            </Routes>
        </BrowserRouter>
    )
}
