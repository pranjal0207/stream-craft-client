import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

export const getUploaderSubscribers = async (id:string) => {
    const response = await axios.get(`${BASE_API}/user/uploader/${id}/`);

    return({
        "subscribers" : response.data.user.subscribers,
        "name" : response.data.user.firstName 
    });
}

export const getUserData = async (id:string) => {
    const response = await axios.get(`${BASE_API}/user/uploader/${id}/`);
    if (response.data.user){
        return response.data.user;
    } else {
        const response = await axios.get(`${BASE_API}/user/consumer/${id}/`);
        return response.data.user;
    }
}
