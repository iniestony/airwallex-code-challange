import httpRequest from './http';

export const requestInvitation = async (fullName, email) => {
  return httpRequest({
    url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    payload: {
      'name': fullName,
      'email': email
    }
  });
}