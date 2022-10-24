import axios from 'axios';

const createConstitutedCompany = (data) => {
    const response = axios.post(`${process.env.SERVIDOR}/company/constituted`, {
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email,
        address: data.address,
        socialReason: data.socialReason
    });
    return response;
}

export default createConstitutedCompany;