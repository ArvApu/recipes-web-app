import api from './api';

const resource = 'comments';
const parentResource = 'recipes';
const rootResource = 'users';

export default {
  all(rrId, prId) {
    return api.get(`/${rootResource}/${rrId}/${parentResource}/${prId}/${resource}`);
  },

  get(rrId, prId, id) {
    return api.get(`/${rootResource}/${rrId}/${parentResource}/${prId}/${resource}/${id}`);
  },

  create(rrId, prId, payload) {
    return api.post(`/${rootResource}/${rrId}/${parentResource}/${prId}/${resource}`, payload);
  },

  update(rrId, prId, id, payload) {
    return api.patch(`/${rootResource}/${rrId}/${parentResource}/${prId}/${resource}/${id}`, payload);
  },

  delete(rrId, prId, id){
    return api.delete(`/${rootResource}/${rrId}/${parentResource}/${prId}/${resource}/${id}`);
  }
}