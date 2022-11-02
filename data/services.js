import axios from 'axios';

const deleteServices = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/service/delete/${id}`);
    return response;
}

const getServices = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/services`, { headers: { cookie: token } });
    return response;
}

const getSpecificService = async (id, token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/service/search/${id.sid}`, { headers: { cookie: token } });
    return response
}

const deleteManyItems = async (data) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/items/delete/`, data);
    return response;
}

const postService = async (name, description, price, itemList) => {
    itemList = itemList.map((item) => {
        return item.name
    })
    let response = await axios.post(`${process.env.SERVIDOR}/service`, {
        name: name,
        description: description,
        price: price
    })
    let items = await axios.post(`${process.env.SERVIDOR}/item/${response.data._id}`, { itemList: itemList })
    return items
}

const updateManyItems = async (id, itemList) => {
    const response = await axios.put(`${process.env.SERVIDOR}/items/update/${id}`, {
        itemList
    });
    return response;
}

const updateService = (id, data) => {
    const response = axios.put(`${process.env.SERVIDOR}/service/update/${id}`, data)
    return response
}

module.exports = {
    deleteServices,
    getServices,
    getSpecificService,
    deleteManyItems,
    postService,
    updateManyItems,
    updateService,
}