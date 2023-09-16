import { api } from './api'

export async function registerUser(data) {
    try {
        await api.post('/register', data);
        return {
            title: 'Sucesso!',
            message: 'Usuário cadastrado!'
        }
    } catch (error) {
        return {
            title: 'Houve um erro no cadastro!',
            message: error.response.data.error
        }
    }
}

export async function loginUser(data) {
    try {
        await api.post('/login', data);
        return {
            title: 'Sucesso!',
            message: 'Usuário entrou!'
        }
    } catch (error) {
        return {
            title: 'Houve um erro no login!',
            message: error.response.data.error
        }
    }
}
