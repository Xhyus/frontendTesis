import axios from 'axios';

const checkToken = async (token) => {
    console.log(token)
    const response = await axios.get(`${process.env.SERVIDOR}/checkToken`, { headers: { 'authorization': `bearer ${token}` } });
    return response;
}

const postLogin = async (email, password) => {
    const response = await axios.post(`${process.env.SERVIDOR}/login`, {
        email,
        password,
    });
    return response;
}

const recoverPassword = async (email) => {
    const response = await axios.post(`${process.env.SERVIDOR}/recoverPassword`, {
        email
    });
    return response;
}

const changePassword = async (password, token) => {
    const response = await axios.put(`${process.env.SERVIDOR}/changePassword`, {
        password: password.password,
        newPassword: password.newPassword,
        rePassword: password.rePassword,
    }, { headers: { 'authorization': `bearer ${token}` } });
    return response;
}

const createUser = async (name, email, password, rePassword, token) => {
    const response = await axios.post(`${process.env.SERVIDOR}/user`, {
        name,
        email,
        password,
        rePassword,
    }, { headers: { 'authorization': `bearer ${token}` } });
    return response;
}

module.exports = {
    checkToken,
    postLogin,
    recoverPassword,
    changePassword,
    createUser,
}