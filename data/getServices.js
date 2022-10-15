import axios from "axios";

const getServices = async () => {
    const response = await axios.get(`${process.env.SERVIDOR}/services`);
    return response;
}

export default getServices;