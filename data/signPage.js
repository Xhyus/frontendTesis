import axios from 'axios';

const updateSignedPage = (id) => {
    const response = axios.get(`${process.env.SERVIDOR}/sign/page/${id.empresa}`);
    return response;
}

export default updateSignedPage;