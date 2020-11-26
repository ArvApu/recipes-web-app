import api from './api';

const resource = 'recipes';
const parentResource = 'users';

export default {
  all(prId = null) {

    if(prId === null) {
      return api.get(`/${resource}`);
    }

    return api.get(`/${parentResource}/${prId}/${resource}`);
  },

  get(prId, id) {
    return api.get(`/${parentResource}/${prId}/${resource}/${id}`);
  },

  create(prId, payload) {      
    return api.post(`/${parentResource}/${prId}/${resource}`, payload);
  },

  update(prId, id, payload) {
    if(payload instanceof FormData) {
      payload.append('_method', 'PATCH');
    } else {
      payload._method = 'PATCH';
    }
    return api.post(`/${parentResource}/${prId}/${resource}/${id}`, payload);
  },

  delete(prId, id){
    return api.delete(`/${parentResource}/${prId}/${resource}/${id}`);
  }
}