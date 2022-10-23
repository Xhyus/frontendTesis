import axios from 'axios';

const getSpecificService = async (id, token) => {
    console.log('id', id.sid, 'token', token);
    const response = await axios.get(`${process.env.SERVIDOR}/service/search/${id.sid}`, { headers: { cookie: token } });
    return response
}

export default getSpecificService;