import axios from 'axios';

const httpRequest = async (params = {}) => {
  return axios({
    url: params.url || '',
    method: params.method || 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params.payload || {})
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(e => {
      return Promise.resolve(e.response);
    });
};

export default httpRequest;