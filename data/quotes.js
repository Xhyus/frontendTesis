import axios from 'axios';

const getQuotes = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quotes/active`, { headers: { cookie: token } });
    return response
}

const getQuote = async (id, token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quote/search/${id}`, { headers: { cookie: token } });
    return response
}

const getClientQuote = async (url, token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quote/search/client/${url}`, { headers: { cookie: token } });
    return response
}

const deleteQuote = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/quote/delete/${id}`);
    return response
}

// TODO Create a new quote

module.exports = {
    getQuotes,
    getQuote,
    getClientQuote,
    deleteQuote
}