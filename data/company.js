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
        contactName: contact.name,
        contactRut: contact.rut,
        contactPhone: contact.phone,
        contactEmail: contact.email,
        contactRole: contact.position,
    })
        .then((response) => {
            console.log(response)
        })

    return response;
}

module.exports = {
    createCompany,
}