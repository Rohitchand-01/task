import axios from "axios";

// instance
const axios_instance = axios.create({
  baseURL: `${import.meta.env.VITE_DEPLOYED_BACKEND_HOSTNAME}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axios_instance };
