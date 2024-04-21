import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

export const signUp = async (user:any, type:string) => {
    const response = await axios.post(`${BASE_API}/login/${type}/register`, user);
    return response.data;
}