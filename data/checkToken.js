import axios from 'axios';

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/checkToken`, { headers: { cookie: token } });
    return response;
}

export default checkToken;