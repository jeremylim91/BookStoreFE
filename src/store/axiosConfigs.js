import axios from "axios";


// Configs for axios
const BACKEND_URL = "http://localhost:3004";

const Axios = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL
});

export default Axios