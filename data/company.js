import axios from 'axios';

const createCompany = (company, contact, state) => {
    const response = axios.post(`${process.env.SERVIDOR}/company`, {
        name: company.name,
        rut: company.rut,
        phone: company.phone,
        email: company.email,
        address: company.address,
        socialReason: company.socialReason,
        state: state === true ? 'constituted' : 'unconstituted',
        contactName: contact.contactName,
        contactRut: contact.contactRut,
        contactPhone: contact.contactPhone,
        contactEmail: contact.contactEmail,
        contactRole: contact.contactRole,
    });
    return response;
}

module.exports = {
    createCompany,
}