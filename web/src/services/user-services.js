import { api } from './api'

export async function registerUser(data) {
    try {
        const result = await api.post('/createUser', data);
        console.log("result: ");
        return result;
    } catch (error) {
        return {
            title: error,
            message: error
        }
    }
}
export async function userLogado(token) {
    try {
        const result = await api.post(`/userLogged`, {
          token: token
        });
        return result
    } catch (error) {
        return {
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
            message: error
        }
    }
}
