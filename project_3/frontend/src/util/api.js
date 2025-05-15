import axios from './axios.customize';

const createUserApi = (username, email, password) => {
    const URL_API = '/api/v1/user/register';
    const data = {
        username: username,
        email: email,
        password: password
    }
    return axios.post(URL_API, data)
}

export {
    createUserApi,
}