import axios from 'axios';

const createCompany = (company, contact, companyRUT, contactRUT, state) => {
    const response = axios.post(`${process.env.SERVIDOR}/company`, {
        name: company.name,
        rut: companyRUT,
        phone: company.phone,
        email: company.email,
        address: company.address,
        socialReason: company.socialReason,
        state: state === true ? 'constituted' : 'unconstituted',
        contactName: contact.name,
        contactRut: contactRUT,
        contactPhone: contact.phone,
        contactEmail: contact.email,
        contactRole: contact.position,
    })
    return response;
}

const editCompany = async (company, contact, companyRUT, contactRUT, state, id) => {
    const response = await axios.put(`${process.env.SERVIDOR}/company/update/${id}`, {
        name: company.name,
        rut: companyRUT,
        phone: company.phone,
        email: company.email,
        address: company.address,
        socialReason: company.socialReason,
        state: state === true ? 'constituted' : 'unconstituted',
        contactName: contact.name,
        contactRut: contactRUT,
        contactPhone: contact.phone,
        contactEmail: contact.email,
        contactRole: contact.position
    })
    return response;
}

const getCompanies = (token) => {
    const response = axios.get(`${process.env.SERVIDOR}/companies`, { headers: { cookie: token } })
    return response;
}

const getCompany = (id, token) => {
    const response = axios.get(`${process.env.SERVIDOR}/company/search/${id}`, { headers: { cookie: token } })
    return response;
}

const deleteCompany = (id) => {
    const response = axios.delete(`${process.env.SERVIDOR}/company/delete/${id}`)
    return response;
}

module.exports = {
    createCompany,
    getCompanies,
    getCompany,
    deleteCompany,
    editCompany
}