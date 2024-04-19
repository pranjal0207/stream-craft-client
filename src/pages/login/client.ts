import axios from 'axios';
import { setLogin } from './reducer';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

export const signIn = async (credentials:any) => {
    const response = await axios.post(`${BASE_API}/login/`, credentials);

    return response.data;
}