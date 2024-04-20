import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_BASE_API;



export const uploadVideo = async (video:any, token:string) => {
    const config = {
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await axios.post(`${BASE_API}/video/newVideo`, video, config);
    console.log(response.data)
    return video;
}