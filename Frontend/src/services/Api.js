import axios from "axios";
 const backend_url = import .meta.env.VITE_BACKEND_URL;
 export async function Get(url){
    try {
        const response = await axios.get(`${backend_url}${url}`);
        console.log(response);
        return response.data;
    } catch (error) {
        return error
    }
 }

