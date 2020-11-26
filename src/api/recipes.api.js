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
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
       
    return api.post(`/${parentResource}/${prId}/${resource}`, payload, config);
  },

  update(prId, id, payload) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }

    return api.patch(`/${parentResource}/${prId}/${resource}/${id}`, payload, config);
  },

  delete(prId, id){
    return api.delete(`/${parentResource}/${prId}/${resource}/${id}`);
  }
}