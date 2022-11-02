import axios from 'axios';

const updateSignedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/sign/page/${id.empresa}`);
    return response;
}

const signedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/signed/search/${id.empresa}`);
    return response;
}

const createSignedPage = (use) => {
    const response = axios.post(`${process.env.SERVIDOR}/signed`, {
        use: use
    })
    return response;
}

module.exports = {
    updateSignedPage,
    signedPage,
    createSignedPage,
}