import axios from "axios";

// Set the base URL for backend API
const instance = axios.create({
  baseURL: "https://livinboston.onrender.com", // Update to your backend base URL
});

export default instance;
