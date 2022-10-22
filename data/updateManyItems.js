import axios from "axios";

const updateManyItems = async (data) => {
    const response = await axios.put(`${process.env.SERVIDOR}/items/update`, data);
    return response;
}

export default updateManyItems;