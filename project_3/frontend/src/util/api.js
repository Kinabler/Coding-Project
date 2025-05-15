/*
    This file contains all the API calls to the backend.
    It uses axios to make the requests and returns the response.
*/

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

const loginUserApi = (email, password) => {
    const URL_API = "/api/v1/user/login";
    const data = {
        email: email,
        password: password
    }
    return axios.post(URL_API, data)
}

const getUsersApi = () => {
    const URL_API = "/api/v1/user/get-users";
    return axios.get(URL_API);
}

export {
    createUserApi,
    loginUserApi,
    getUsersApi,
}