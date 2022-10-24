import axios from 'axios';

const createUnConstitutedCompany = (data) => {
    const response = axios.post(`${process.env.SERVIDOR}/company/unconstituted`, {
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email
    });
    return response;
}

export default createUnConstitutedCompany;