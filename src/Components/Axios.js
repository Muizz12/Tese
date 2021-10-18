import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/",//THE API (Cloud function URL )URL
});
export default instance;
