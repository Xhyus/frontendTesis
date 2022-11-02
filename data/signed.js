import axios from 'axios';

const updateSignedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/sign/page/${id.empresa}`);
    return response;
}

const signedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/signed/search/${id.empresa}`);
    return response;
}

module.exports = {
    updateSignedPage,
    signedPage,
}