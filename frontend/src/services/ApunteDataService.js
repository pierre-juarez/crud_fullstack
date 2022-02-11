import http from "../http-common";

class ApunteDataService {
  getAll() {
    return http.get("/apuntes");
  }

  get(id) {
    return http.get(`/apuntes/${id}`);
  }

  create(data) {
    return http.post("/apuntes", data);
  }

  update(id, data) {
    return http.put(`/apuntes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/apuntes/${id}`);
  }

  deleteAll() {
    return http.delete("/apuntes");
  }

  findByTitle(title) {
    return http.get(`/apuntes?title=${title}`);
  }
}

export default new ApunteDataService();
