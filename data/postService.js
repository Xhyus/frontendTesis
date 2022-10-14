import axios from 'axios';

const postService = (name, description, price, itemList) => {
    console.log(name, description, price, itemList);
    let response = axios.post('http://localhost:3001/api/service', {
        name,
        description,
        price,
        itemList
    });
    return response
}

export default postService;