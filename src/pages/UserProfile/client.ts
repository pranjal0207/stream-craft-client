import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;

export const fetchWatchedVideos = async (headers:any, user_id:string) => {
    const response = await axios.get(`${BASE_API}/user/getWatchedVideos/${user_id}`, { headers });
    return response.data;
}