import axios from "axios";

const getServices = async (id) => {
    const response = await axios.delete(`${process.env.SERVIDOR}/service/delete/${id}`);
    return response;
}

export default getServices;