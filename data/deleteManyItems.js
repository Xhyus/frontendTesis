import axios from "axios";

const deleteManyItems = async (data) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/items/delete/`, data);
    return response;
}

export default deleteManyItems;