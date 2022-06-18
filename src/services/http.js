const httpRequest = async (params = {}) => {
  return fetch(params.url || '', {
    method: params.method || 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.payload || {})
  });
};

export default httpRequest;