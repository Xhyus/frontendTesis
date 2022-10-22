import axios from "axios";

const updateManyItems = async (id, itemList) => {
    const response = await axios.put(`${process.env.SERVIDOR}/items/update/${id}`, {
        itemList
    });
    return response;
}

export default updateManyItems;