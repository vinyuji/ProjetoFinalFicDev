import { api } from './api'

export async function registerUser(data) {
    try {
        const result = await api.post('/createUser', data);
        console.log("result: ", result);
        return result
    } catch (error) {
        return {
            title: 'Houve um erro no cadastro!',
            message: error.response.data.error
        }
    }
}

export async function loginUser(data) {
    try {
        const result = await api.post('/LoginUser', data);
        console.log("result: ", result);
        return result
    } catch (error) {
        return {
            title: 'Houve um erro no login!',
            message: error.response.data.error
        }
    }
}
