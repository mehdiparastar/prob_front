import axios from 'axios';
import { baseURL } from '../baseUrl';


export default axios.create({
    baseURL,
    headers:{"Content-Type":"application/json"}
})