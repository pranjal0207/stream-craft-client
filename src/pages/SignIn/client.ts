import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

export const signIn = async (credentials:any, type:string) => {
    const response = await axios.post(`${BASE_API}/login/${type}/`, credentials);
    
    return response.data;
}