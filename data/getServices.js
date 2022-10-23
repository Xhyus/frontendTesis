import axios from "axios";

const getServices = async (token) => {
    const response = await axios.get(`${process.env.SERVIDOR}/services`, { headers: { cookie: token } });
    return response;
}

export default getServices;