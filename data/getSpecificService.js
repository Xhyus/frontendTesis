import axios from 'axios';

const getSpecificService = async (id) => {
    const response = await axios.get(`${process.env.SERVIDOR}/service/search/${id}`);
    return response.data
}

export default getSpecificService;