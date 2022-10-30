import axios from 'axios';

const signedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/signed/search/${id.empresa}`);
    return response;
}

export default signedPage;