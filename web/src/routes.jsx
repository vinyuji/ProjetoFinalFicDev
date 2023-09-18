import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from './utils/is-authenticated';

import { Cadastro } from './pages/cadastro/Index'
import { Login } from './pages/login/Index'
import { Home } from './pages/home/Index'
import { Reserva } from './pages/Reserva/Index'
import { Sala } from './pages/salas/Index'
import { Perfil } from './pages/perfil/Index'

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
                <Route index path='/' element={<Login />}/>
                <Route path='/Cadastro' element={<Cadastro />}/>
                <Route path='/Home' element={<Home />}/>
                <Route path='/Reserva' element={<Reserva />}/>
                <Route path='/Perfil' element={<Perfil />}/>
                <Route path='/Sala' element={<Sala />}/>
            </Routes>
        </BrowserRouter>
    )
}
