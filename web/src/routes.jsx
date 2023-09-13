import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from './utils/is-authenticated';

import { Sala } from './pages/salas/Index';

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
            <Route index path='/createSala' element={<Sala />} />
            </Routes>
        </BrowserRouter>
    )
}
