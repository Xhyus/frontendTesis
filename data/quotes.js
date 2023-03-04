import axios from 'axios';

const getQuotes = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quotes/active`, { headers: { 'authorization': `bearer ${token}` } });
    return response
}

const getQuote = async (id, token) => {
    console.log(id)
    console.log(token)
    const response = await axios.get(`${process.env.SERVIDOR}/quote/search/${id}`, { headers: { 'authorization': `bearer ${token}` } });
    return response
}

const getClientQuote = async (url, token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/quote/search/client/${url}`, { headers: { 'authorization': `bearer ${token}` } });
    return response
}

const deleteQuote = async (id, token) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/quote/delete/${id}`, { headers: { 'authorization': `bearer ${token}` } });
    return response
}

const createQuote = async (quote, token) => {
    const response = await axios.post(`${process.env.SERVIDOR}/quote`, quote, { headers: { 'authorization': `bearer ${token}` } });
    return response
}

module.exports = {
    getQuotes,
    getQuote,
    getClientQuote,
    deleteQuote,
    createQuote
}