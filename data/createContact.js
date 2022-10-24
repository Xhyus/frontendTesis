import axios from 'axios';

const createContact = (id, data) => {
    const response = axios.post(`${process.env.SERVIDOR}/contact/${id}`, {
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email,
        role: data.role,
    });
    return response;
}

export default createContact;