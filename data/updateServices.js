import axios from 'axios';

const updateServices = (id, data) => {
    const response = axios.put(`http://localhost:3001/api/service/update/${id}`, data)
    return response
}

export default updateServices