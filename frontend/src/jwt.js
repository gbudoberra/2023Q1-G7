import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function getRole(token, context) {
  if (token) {
    const tok = jwtDecode(token);
    console.log('tok' + tok)
    const username = tok["cognito:username"];
    const email = tok.email;

    axios.get(context.cdn.api_gw + 'users', {
      params: {
        username: username,
        email: email
      }
    }).then(response => {
      console.log('response:' + response.data);
      return response.data.role
    })
    .catch(error => {
      console.error(error);
    });
  }
  return null;
}
