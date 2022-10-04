import axios from "axios";

const postLogin = async (email, password) => {
    const response = await axios.post(`${process.env.SERVIDOR}/api/login`, {
        email,
        password,
    });
    return response;
}

export default postLogin;