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
    console.log(response)
    return response
}

const createQuote = async (quote) => {
    console.log(quote)
    const response = await axios.post(`${process.env.SERVIDOR}/quote`, quote);
    return response
}

module.exports = {
    getQuotes,
    getQuote,
    getClientQuote,
    deleteQuote,
    createQuote
}