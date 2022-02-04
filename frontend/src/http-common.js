import axios from "axios";

const base_url = "http://localhost/api/8080";

export default axios.create({
  baseURL: base_url,
  headers: {
    "Content-type": "application/json",
  },
});
