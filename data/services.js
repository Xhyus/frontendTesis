import axios from 'axios';

const deleteServices = async (id) => {
    const response = await axios.put(`${process.env.SERVIDOR}/service/delete/${id}`);
    return response;
}

const getServices = async (token) => {
    console.log("peticion por realizar")
    const response = await axios.get(`${process.env.SERVIDOR}/services`, { headers: { 'authorization': `bearer ${token}` } });
    return response;
}

const getSpecificService = async (id, token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/service/search/${id}`, { headers: { cookie: token } });
    return response
}

const postService = async (name, description, price, type, itemList) => {
    itemList = itemList.map((item) => {
        return item.name
    })
    const response = await axios.post(`${process.env.SERVIDOR}/service`, {
        name,
        description,
        price,
        type,
        itemList
    });
    return response;
}

const updateService = (id, data, itemList) => {
    itemList = itemList.map((item) => {
        return item.description
    })
    const response = axios.put(`${process.env.SERVIDOR}/service/update/${id}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        type: data.type,
        itemList: itemList
    })
    return response
}

module.exports = {
    deleteServices,
    getServices,
    getSpecificService,
    postService,
    updateService,
}