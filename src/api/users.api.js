import api from './api';

const resource = 'users';

export default {
  all() {
    return api.get(`/${resource}`);
  },

  get(id) {
    return api.get(`/${resource}/${id}`);
  },

  create(payload) {
    return api.post(`/${resource}`, payload);
  },

  update(id, payload) {
    return api.patch(`/${resource}/${id}`, payload);
  },

  delete(id){
    return api.delete(`/${resource}/${id}`);
  }
}