import axios from 'axios';

const getQuotes = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quotes/active`, { headers: { cookie: token } });
    return response
}

module.exports = {
    getQuotes
}