import axios from 'axios';

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

export default postService;