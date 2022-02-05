import axios from "axios";

// const base_url = "http://localhost:8022/api/apuntes";
const base_url = "http://localhost:8022/api";

export default axios.create({
  baseURL: base_url,
  headers: {
    "Content-type": "application/json",
  },
});
