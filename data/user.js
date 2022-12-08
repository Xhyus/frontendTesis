import axios from 'axios';

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/checkToken`, { headers: { cookie: token } });
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

module.exports = {
    checkToken,
    postLogin,
    recoverPassword,
}